import { PrismaClient, Role } from '@prisma/client'
import { hash }              from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database…')

  // ─── Admin user ───────────────────────────────────────────────
  const adminPassword = await hash('Admin1234!', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@filateliaperuana.com' },
    update: {},
    create: {
      email:        'admin@filateliaperuana.com',
      username:     'admin',
      fullName:     'Administrador',
      passwordHash: adminPassword,
      countryCode:  'PE',
      role:         Role.SUPER_ADMIN,
    },
  })
  console.log(`  ✓ Admin: ${admin.email}`)

  // ─── Demo user ───────────────────────────────────────────────
  const userPassword = await hash('Demo1234!', 12)
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@filateliaperuana.com' },
    update: {},
    create: {
      email:        'demo@filateliaperuana.com',
      username:     'coleccionista_demo',
      fullName:     'Coleccionista Demo',
      passwordHash: userPassword,
      countryCode:  'PE',
      role:         Role.USER,
    },
  })
  console.log(`  ✓ Demo user: ${demoUser.email}`)

  // ─── Catalog: Perú ────────────────────────────────────────────
  const catalogPeru = await prisma.catalog.upsert({
    where: { slug: 'peru' },
    update: {},
    create: {
      slug: 'peru', nameEs: 'Perú', nameEn: 'Peru',
      descEs: 'Colección filatélica completa del Perú desde 1857 hasta la actualidad.',
      descEn: 'Complete philatelic collection of Peru from 1857 to the present.',
      type: 'COUNTRY', countryCode: 'PE', status: 'ACTIVE', order: 1,
    },
  })
  console.log(`  ✓ Catalog: ${catalogPeru.nameEs}`)

  // Group 1
  const g1 = await prisma.stampGroup.upsert({
    where: { id: 'g-pe-1857' }, update: {},
    create: { id: 'g-pe-1857', catalogId: catalogPeru.id, year: 1857, titleEs: 'Primeros Sellos del Perú', titleEn: 'First Stamps of Peru', order: 1 },
  })
  const pe001 = await prisma.stamp.upsert({ where: { id: 's-pe-001' }, update: {},
    create: { id: 's-pe-001', groupId: g1.id, order: 1, faceValue: '1d', issueDate: new Date('1857-12-01'), color: 'Azul', perforation: 'Imperf', conditionCode: 'MNH', isPublished: true } })
  await prisma.stampCatalogNumber.upsert({ where: { id: 'cn-001-s' }, update: {}, create: { id: 'cn-001-s', stampId: pe001.id, system: 'SCOTT', number: '1' } })
  await prisma.stampCatalogNumber.upsert({ where: { id: 'cn-001-m' }, update: {}, create: { id: 'cn-001-m', stampId: pe001.id, system: 'MICHEL', number: '1' } })

  const pe002 = await prisma.stamp.upsert({ where: { id: 's-pe-002' }, update: {},
    create: { id: 's-pe-002', groupId: g1.id, order: 2, faceValue: '1r', issueDate: new Date('1857-12-01'), color: 'Rojo', perforation: 'Imperf', conditionCode: 'MNH', isPublished: true } })
  await prisma.stampCatalogNumber.upsert({ where: { id: 'cn-002-s' }, update: {}, create: { id: 'cn-002-s', stampId: pe002.id, system: 'SCOTT', number: '2' } })

  const pe003 = await prisma.stamp.upsert({ where: { id: 's-pe-003' }, update: {},
    create: { id: 's-pe-003', groupId: g1.id, order: 3, faceValue: '1r', issueDate: new Date('1858-03-01'), color: 'Marrón', perforation: 'Imperf', conditionCode: 'USED', isPublished: true } })
  await prisma.stampCatalogNumber.upsert({ where: { id: 'cn-003-s' }, update: {}, create: { id: 'cn-003-s', stampId: pe003.id, system: 'SCOTT', number: '3' } })

  // Group 2
  const g2 = await prisma.stampGroup.upsert({
    where: { id: 'g-pe-1862' }, update: {},
    create: { id: 'g-pe-1862', catalogId: catalogPeru.id, year: 1862, titleEs: 'Escudo de Armas — Dentado', titleEn: 'Coat of Arms — Perforated', order: 2 },
  })
  const pe010 = await prisma.stamp.upsert({ where: { id: 's-pe-010' }, update: {},
    create: { id: 's-pe-010', groupId: g2.id, order: 1, faceValue: '1d', issueDate: new Date('1862-01-01'), color: 'Rojo', perforation: '12', conditionCode: 'MH', isPublished: true } })
  await prisma.stampCatalogNumber.upsert({ where: { id: 'cn-010-s' }, update: {}, create: { id: 'cn-010-s', stampId: pe010.id, system: 'SCOTT', number: '10' } })

  // Group 3
  const g3 = await prisma.stampGroup.upsert({
    where: { id: 'g-pe-1874' }, update: {},
    create: { id: 'g-pe-1874', catalogId: catalogPeru.id, year: 1874, titleEs: 'UPU — Unión Postal Universal', titleEn: 'Universal Postal Union', order: 3 },
  })
  const pe021 = await prisma.stamp.upsert({ where: { id: 's-pe-021' }, update: {},
    create: { id: 's-pe-021', groupId: g3.id, order: 1, faceValue: '2c', issueDate: new Date('1874-06-01'), color: 'Violeta', printRun: 500000, perforation: '12', conditionCode: 'MNH', isPublished: true } })
  await prisma.stampCatalogNumber.upsert({ where: { id: 'cn-021-s' }, update: {}, create: { id: 'cn-021-s', stampId: pe021.id, system: 'SCOTT',  number: '21' } })
  await prisma.stampCatalogNumber.upsert({ where: { id: 'cn-021-m' }, update: {}, create: { id: 'cn-021-m', stampId: pe021.id, system: 'MICHEL', number: '21' } })
  await prisma.stampCatalogNumber.upsert({ where: { id: 'cn-021-y' }, update: {}, create: { id: 'cn-021-y', stampId: pe021.id, system: 'YVERT',  number: '21' } })
  console.log(`  ✓ Perú: 3 grupos, stamps seeded`)

  // ─── Catalog: Israel ─────────────────────────────────────────
  const catIsrael = await prisma.catalog.upsert({
    where: { slug: 'israel' }, update: {},
    create: { slug: 'israel', nameEs: 'Israel', nameEn: 'Israel', descEs: 'Colección filatélica de Israel desde 1948.', type: 'COUNTRY', countryCode: 'IL', status: 'ACTIVE', order: 2 },
  })
  const gi1 = await prisma.stampGroup.upsert({
    where: { id: 'g-il-1948' }, update: {},
    create: { id: 'g-il-1948', catalogId: catIsrael.id, year: 1948, titleEs: 'Sellos de la Independencia', titleEn: 'Independence Stamps', order: 1 },
  })
  const il001 = await prisma.stamp.upsert({ where: { id: 's-il-001' }, update: {},
    create: { id: 's-il-001', groupId: gi1.id, order: 1, faceValue: '3m', issueDate: new Date('1948-05-16'), color: 'Azul', perforation: '11', conditionCode: 'MNH', isPublished: true } })
  await prisma.stampCatalogNumber.upsert({ where: { id: 'cn-il001-s' }, update: {}, create: { id: 'cn-il001-s', stampId: il001.id, system: 'SCOTT', number: '1' } })
  console.log(`  ✓ Israel: 1 grupo seeded`)

  // ─── Stub catalogs ───────────────────────────────────────────
  for (const c of [
    { slug: 'chile', nameEs: 'Chile', nameEn: 'Chile', countryCode: 'CL', order: 3 },
    { slug: 'brasil', nameEs: 'Brasil', nameEn: 'Brasil', countryCode: 'BR', order: 4 },
    { slug: 'argentina', nameEs: 'Argentina', nameEn: 'Argentina', countryCode: 'AR', order: 5 },
  ]) {
    await prisma.catalog.upsert({ where: { slug: c.slug }, update: {}, create: { ...c, type: 'COUNTRY', status: 'UNDER_CONSTRUCTION' } })
    console.log(`  ✓ Stub: ${c.nameEs}`)
  }

  // ─── Visits seed ─────────────────────────────────────────────
  const today = new Date(); today.setHours(0, 0, 0, 0)
  await prisma.siteVisit.upsert({ where: { id: 'seed-v0' }, update: {}, create: { id: 'seed-v0', date: today, count: 12847 } })
  console.log('  ✓ Visitas: 12.847 iniciales')

  console.log('\n✅ Seed completado!')
}

main()
  .catch((e) => { console.error('❌ Error:', e); process.exit(1) })
  .finally(() => prisma.$disconnect())
