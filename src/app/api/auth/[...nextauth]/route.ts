import { NextRequest, NextResponse } from 'next/server'
import { compare } from 'bcryptjs'
import { prisma } from '@/lib/db/prisma'
import { sign } from 'jsonwebtoken'

const SECRET = process.env.NEXTAUTH_SECRET ?? 'dev-secret'

// Simplified JWT auth handler compatible with Next.js 14 App Router
// Replace with next-auth v4 (stable) when moving to production

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Email y contraseña requeridos' }, { status: 400 })
    }

    let user
    try {
      user = await prisma.user.findUnique({ where: { email } })
      if (!user || !user.passwordHash) {
        return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 })
      }
      const valid = await compare(password, user.passwordHash)
      if (!valid) {
        return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 })
      }
    } catch {
      // Demo mode fallback
      if (email === 'admin@test.com' && password === 'Admin1234!') {
        user = { id: 'demo', name: 'Admin Demo', email: 'admin@test.com', username: 'admin', role: 'ADMIN' }
      } else {
        return NextResponse.json({ error: 'Error de conexión con la base de datos' }, { status: 503 })
      }
    }

    const token = sign(
      { id: user.id, email: user.email, name: user.fullName ?? user.email, role: user.role },
      SECRET,
      { expiresIn: '7d' }
    )

    return NextResponse.json({ token, user: { id: user.id, name: user.fullName ?? '', email: user.email, role: user.role } })
  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ status: 'Auth API activa' })
}
