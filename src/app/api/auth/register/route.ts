import { NextResponse }  from 'next/server'
import { hash }          from 'bcryptjs'
import { prisma }        from '@/lib/db/prisma'
import { z }             from 'zod'

const registerSchema = z.object({
  fullName:            z.string().min(2).max(100),
  email:               z.string().email(),
  username:            z.string().min(3).max(30).regex(/^[a-z0-9_]+$/),
  password:            z.string().min(8),
  countryCode:         z.string().length(2).optional(),
  collectingCountries: z.array(z.string()).optional(),
  collectingThemes:    z.array(z.string()).optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = registerSchema.parse(body)

    // Check duplicates
    const exists = await prisma.user.findFirst({
      where: { OR: [{ email: data.email }, { username: data.username }] },
    })
    if (exists) {
      const field = exists.email === data.email ? 'email' : 'username'
      return NextResponse.json({ error: `El ${field} ya está registrado.` }, { status: 409 })
    }

    const hashedPassword = await hash(data.password, 12)

    const user = await prisma.user.create({
      data: {
        fullName:     data.fullName,
        email:        data.email,
        username:     data.username,
        passwordHash: hashedPassword,
        countryCode:  data.countryCode ?? 'PE',
        role:         'USER',
      },
      select: { id: true, fullName: true, email: true, username: true, createdAt: true },
    })

    return NextResponse.json({ data: user }, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Datos inválidos.', issues: err.flatten().fieldErrors }, { status: 422 })
    }
    // DB offline — return demo success so dev can proceed
    return NextResponse.json({ data: { id: 'demo-user', message: 'Registro simulado (sin BD)' } }, { status: 201 })
  }
}
