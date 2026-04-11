import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import styles from './page.module.css'
import catalogStyles from '@/styles/catalog.module.css'
import StampCard from './StampCard'

// ─── Types ────────────────────────────────────────────────────────
interface CatalogNumber { system: string; number: string }
interface StampImage { url: string; altEs: string; isPrimary: boolean }
interface Stamp {
  id: string; order: number; faceValue?: string; issueDate?: string
  color?: string; printRun?: number; perforation?: string
  conditionCode?: string; catalogNumbers: CatalogNumber[]; images: StampImage[]
}
interface StampGroup { id: string; year: number; titleEs: string; titleEn?: string; stamps: Stamp[] }
interface Catalog {
  slug: string; nameEs: string; nameEn?: string; descEs?: string
  status: string; groups: StampGroup[]
}

// ─── Demo data ────────────────────────────────────────────────────
const CATALOGS: Record<string, Catalog> = {
  peru: {
    slug: 'peru', nameEs: 'Perú', nameEn: 'Peru',
    descEs: 'Colección filatélica completa del Perú desde 1857 hasta la actualidad.',
    status: 'ACTIVE',
    groups: [
      {
        id: 'g1', year: 1857, titleEs: 'Primeros Sellos del Perú', titleEn: 'First Stamps of Peru',
        stamps: [
          {
            id: 's1', order: 1, faceValue: '1d', issueDate: '1857-12-01', color: 'Azul',
            printRun: undefined, perforation: 'Imperf',
            catalogNumbers: [{ system: 'SCOTT', number: '1' }, { system: 'MICHEL', number: '1' }],
            images: [{ url: '/stamps/pe-001.jpg', altEs: 'Escudo Nacional Azul 1857', isPrimary: true }],
            conditionCode: 'MNH',
          },
          {
            id: 's2', order: 2, faceValue: '1r', issueDate: '1857-12-01', color: 'Rojo',
            printRun: undefined, perforation: 'Imperf',
            catalogNumbers: [{ system: 'SCOTT', number: '2' }, { system: 'MICHEL', number: '2' }],
            images: [{ url: '/stamps/pe-002.jpg', altEs: 'Escudo Nacional Rojo 1857', isPrimary: true }],
            conditionCode: 'MNH',
          },
          {
            id: 's3', order: 3, faceValue: '1r', issueDate: '1858-03-01', color: 'Marrón',
            printRun: undefined, perforation: 'Imperf',
            catalogNumbers: [{ system: 'SCOTT', number: '3' }],
            images: [{ url: '/stamps/pe-003.jpg', altEs: 'Escudo Nacional Marrón 1858', isPrimary: true }],
            conditionCode: 'USED',
          },
        ],
      },
      {
        id: 'g2', year: 1862, titleEs: 'Escudo de Armas — Dentado', titleEn: 'Coat of Arms — Perforated',
        stamps: [
          {
            id: 's4', order: 1, faceValue: '1d', issueDate: '1862-01-01', color: 'Rojo',
            printRun: undefined, perforation: '12',
            catalogNumbers: [{ system: 'SCOTT', number: '10' }, { system: 'YVERT', number: '10' }],
            images: [{ url: '/stamps/pe-010.jpg', altEs: 'Escudo Rojo Dentado 1862', isPrimary: true }],
            conditionCode: 'MH',
          },
          {
            id: 's5', order: 2, faceValue: '1d', issueDate: '1862-01-01', color: 'Verde',
            printRun: undefined, perforation: '12',
            catalogNumbers: [{ system: 'SCOTT', number: '11' }],
            images: [{ url: '/stamps/pe-011.jpg', altEs: 'Escudo Verde Dentado 1862', isPrimary: true }],
            conditionCode: 'USED',
          },
        ],
      },
      {
        id: 'g3', year: 1874, titleEs: 'UPU — Unión Postal Universal', titleEn: 'Universal Postal Union',
        stamps: [
          {
            id: 's6', order: 1, faceValue: '2c', issueDate: '1874-06-01', color: 'Violeta',
            printRun: 500_000, perforation: '12',
            catalogNumbers: [{ system: 'SCOTT', number: '21' }, { system: 'MICHEL', number: '21' }, { system: 'YVERT', number: '21' }],
            images: [{ url: '/stamps/pe-021.jpg', altEs: 'UPU Violeta 1874', isPrimary: true }],
            conditionCode: 'MNH',
          },
        ],
      },
    ],
  },
  israel: {
    slug: 'israel', nameEs: 'Israel', nameEn: 'Israel',
    descEs: 'Colección filatélica de Israel desde su independencia en 1948.',
    status: 'ACTIVE',
    groups: [
      {
        id: 'g10', year: 1948, titleEs: 'Sellos de la Independencia', titleEn: 'Independence Stamps',
        stamps: [
          {
            id: 's10', order: 1, faceValue: '3m', issueDate: '1948-05-16', color: 'Azul',
            printRun: undefined, perforation: '11',
            catalogNumbers: [{ system: 'SCOTT', number: '1' }],
            images: [{ url: '/stamps/il-001.jpg', altEs: 'Bandera de Israel 1948', isPrimary: true }],
            conditionCode: 'MNH',
          },
          {
            id: 's11', order: 2, faceValue: '5m', issueDate: '1948-05-16', color: 'Verde',
            printRun: undefined, perforation: '11',
            catalogNumbers: [{ system: 'SCOTT', number: '2' }],
            images: [{ url: '/stamps/il-002.jpg', altEs: 'Moneda Antigua 1948', isPrimary: true }],
            conditionCode: 'MNH',
          },
        ],
      },
    ],
  },
}

// ─── Server Component ─────────────────────────────────────────────
type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cat = CATALOGS[slug]
  if (!cat) return { title: 'Catálogo no encontrado' }
  return {
    title: `Catálogo ${cat.nameEs} — Filatelia Peruana`,
    description: cat.descEs,
  }
}

export default async function CatalogPage({ params }: Props) {
  const { slug } = await params
  const catalog = CATALOGS[slug]
  if (!catalog) notFound()

  return (
    <div className={catalogStyles.albumPage}>
      {/* Header oscuro */}
      <header className={catalogStyles.catalogHeader}>
        <div className="container">
          <p className={styles.breadcrumb}>
            <Link href="/catalogos">Catálogos</Link> /{' '}
            <Link href="/catalogos/paises">Países</Link> / {catalog.nameEs}
          </p>
          <h1 className={catalogStyles.catalogTitle}>{catalog.nameEs}</h1>
          {catalog.descEs && (
            <p className={styles.desc}>{catalog.descEs}</p>
          )}
        </div>
      </header>

      {/* Grupos de sellos (álbum crema) */}
      <section className={catalogStyles.albumSection}>
        <div className="container">
          {catalog.groups.map((group) => (
            <article
              key={group.id}
              className={catalogStyles.stampGroup}
              id={`group-${group.id}`}
            >
              {/* Cabecera verde musgo */}
              <div className={catalogStyles.stampGroupHeader}>
                <span className={catalogStyles.stampGroupYear}>{group.year}</span>
                <span className={catalogStyles.stampGroupTitleEs}>{group.titleEs}</span>
                {group.titleEn && (
                  <span className={catalogStyles.stampGroupTitleEn}>{group.titleEn}</span>
                )}
              </div>

              {/* Body — grilla de sellos */}
              <div className={catalogStyles.stampGroupBody}>
                <div className={catalogStyles.stampGrid}>
                  {group.stamps.map((stamp) => (
                    <StampCard key={stamp.id} stamp={stamp} />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
