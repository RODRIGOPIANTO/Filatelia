import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

// Demo data for development
const DEMO: Record<string, object> = {
  peru: {
    id: 'c1', slug: 'peru', nameEs: 'Perú', nameEn: 'Peru',
    descEs: 'Colección filatélica completa del Perú desde 1857 hasta la actualidad.',
    status: 'ACTIVE', type: 'COUNTRY', countryCode: 'PE',
    groups: [
      {
        id: 'g1', year: 1857, titleEs: 'Primeros Sellos del Perú', titleEn: 'First Stamps of Peru', order: 1,
        stamps: [
          { id: 's1', order: 1, faceValue: '1d', issueDate: '1857-12-01', color: 'Azul', perforation: 'Imperf', conditionCode: 'MNH', isPublished: true, catalogNumbers: [{ system: 'SCOTT', number: '1' }, { system: 'MICHEL', number: '1' }], images: [{ url: '/images/stamps/pe-001.jpg', altEs: 'Escudo Azul 1857', isPrimary: true, isFront: true, order: 1 }] },
          { id: 's2', order: 2, faceValue: '1r', issueDate: '1857-12-01', color: 'Rojo', perforation: 'Imperf', conditionCode: 'MNH', isPublished: true, catalogNumbers: [{ system: 'SCOTT', number: '2' }, { system: 'MICHEL', number: '2' }], images: [{ url: '/images/stamps/pe-002.jpg', altEs: 'Escudo Rojo 1857', isPrimary: true, isFront: true, order: 1 }] },
          { id: 's3', order: 3, faceValue: '1r', issueDate: '1858-03-01', color: 'Marrón', perforation: 'Imperf', conditionCode: 'USED', isPublished: true, catalogNumbers: [{ system: 'SCOTT', number: '3' }], images: [{ url: '/images/stamps/pe-003.jpg', altEs: 'Escudo Marrón 1858', isPrimary: true, isFront: true, order: 1 }] },
        ],
      },
      {
        id: 'g2', year: 1862, titleEs: 'Escudo de Armas — Dentado', titleEn: 'Coat of Arms — Perforated', order: 2,
        stamps: [
          { id: 's4', order: 1, faceValue: '1d', issueDate: '1862-01-01', color: 'Rojo', perforation: '12', conditionCode: 'MH', isPublished: true, catalogNumbers: [{ system: 'SCOTT', number: '10' }, { system: 'YVERT', number: '10' }], images: [{ url: '/images/stamps/pe-010.jpg', altEs: 'Escudo Rojo Dentado 1862', isPrimary: true, isFront: true, order: 1 }] },
          { id: 's5', order: 2, faceValue: '1d', issueDate: '1862-01-01', color: 'Verde', perforation: '12', conditionCode: 'USED', isPublished: true, catalogNumbers: [{ system: 'SCOTT', number: '11' }], images: [{ url: '/images/stamps/pe-011.jpg', altEs: 'Escudo Verde Dentado 1862', isPrimary: true, isFront: true, order: 1 }] },
        ],
      },
      {
        id: 'g3', year: 1874, titleEs: 'UPU — Unión Postal Universal', titleEn: 'Universal Postal Union', order: 3,
        stamps: [
          { id: 's6', order: 1, faceValue: '2c', issueDate: '1874-06-01', color: 'Violeta', printRun: 500000, perforation: '12', conditionCode: 'MNH', isPublished: true, catalogNumbers: [{ system: 'SCOTT', number: '21' }, { system: 'MICHEL', number: '21' }, { system: 'YVERT', number: '21' }], images: [{ url: '/images/stamps/pe-021.jpg', altEs: 'UPU Violeta 1874', isPrimary: true, isFront: true, order: 1 }] },
        ],
      },
    ],
  },
  israel: {
    id: 'c2', slug: 'israel', nameEs: 'Israel', nameEn: 'Israel',
    descEs: 'Colección filatélica de Israel desde su independencia en 1948.',
    status: 'ACTIVE', type: 'COUNTRY', countryCode: 'IL',
    groups: [
      {
        id: 'g10', year: 1948, titleEs: 'Sellos de la Independencia', titleEn: 'Independence Stamps', order: 1,
        stamps: [
          { id: 's10', order: 1, faceValue: '3m', issueDate: '1948-05-16', color: 'Azul', perforation: '11', conditionCode: 'MNH', isPublished: true, catalogNumbers: [{ system: 'SCOTT', number: '1' }], images: [{ url: '/images/stamps/il-001.jpg', altEs: 'Bandera de Israel 1948', isPrimary: true, isFront: true, order: 1 }] },
          { id: 's11', order: 2, faceValue: '5m', issueDate: '1948-05-16', color: 'Verde', perforation: '11', conditionCode: 'MNH', isPublished: true, catalogNumbers: [{ system: 'SCOTT', number: '2' }], images: [{ url: '/images/stamps/il-002.jpg', altEs: 'Moneda Antigua 1948', isPrimary: true, isFront: true, order: 1 }] },
        ],
      },
    ],
  },
}

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const cat = await prisma.catalog.findUnique({
      where: { slug: params.slug },
      include: {
        groups: {
          orderBy: { order: 'asc' },
          include: {
            stamps: {
              where: { isPublished: true },
              orderBy: { order: 'asc' },
              include: {
                images: { orderBy: { order: 'asc' } },
                catalogNumbers: true,
              },
            },
          },
        },
      },
    })
    if (!cat) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ data: cat })
  } catch {
    const demo = DEMO[params.slug]
    if (!demo) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ data: demo })
  }
}
