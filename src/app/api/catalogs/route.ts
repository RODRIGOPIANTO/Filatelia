import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

// Demo data fallback cuando no hay BD conectada
const DEMO_CATALOGS = [
  { id: 'c1', slug: 'peru', nameEs: 'Perú', nameEn: 'Peru', descEs: 'Colección filatélica completa del Perú desde 1857.', type: 'COUNTRY', countryCode: 'PE', status: 'ACTIVE', coverUrl: null, order: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), _count: { groups: 3, stamps: 87 } },
  { id: 'c2', slug: 'israel', nameEs: 'Israel', nameEn: 'Israel', descEs: 'Colección filatélica de Israel desde 1948.', type: 'COUNTRY', countryCode: 'IL', status: 'ACTIVE', coverUrl: null, order: 2, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), _count: { groups: 1, stamps: 54 } },
  { id: 'c3', slug: 'chile', nameEs: 'Chile', nameEn: 'Chile', descEs: null, type: 'COUNTRY', countryCode: 'CL', status: 'UNDER_CONSTRUCTION', coverUrl: null, order: 3, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), _count: { groups: 0, stamps: 0 } },
]

export async function GET() {
  try {
    const catalogs = await prisma.catalog.findMany({
      where: { status: { in: ['ACTIVE', 'UNDER_CONSTRUCTION'] } },
      orderBy: { order: 'asc' },
      include: {
        _count: { select: { groups: true } },
      },
    })
    return NextResponse.json({ data: catalogs })
  } catch {
    // DB not connected — return demo data
    return NextResponse.json({ data: DEMO_CATALOGS })
  }
}
