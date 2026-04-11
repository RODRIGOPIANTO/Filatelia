import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

const DEMO_COUNT = 12847

export async function GET() {
  try {
    const visits = await prisma.siteVisit.count()
    return NextResponse.json({ visits: visits + DEMO_COUNT })
  } catch {
    return NextResponse.json({ visits: DEMO_COUNT })
  }
}

export async function POST(req: Request) {
  try {
    const { path = '/', countryCode, userAgent, ip } = await req.json().catch(() => ({}))
    await prisma.siteVisit.create({
      data: { path, countryCode, userAgent, ip },
    })
    const visits = await prisma.siteVisit.count()
    return NextResponse.json({ visits: visits + DEMO_COUNT })
  } catch {
    return NextResponse.json({ visits: DEMO_COUNT + 1 })
  }
}
