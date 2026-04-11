import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Catálogos por País — Filatelia Peruana',
  description: 'Explore catálogos filatélicos organizados por país emisor.',
}

interface CountryCatalog {
  slug: string
  nameEs: string
  countryCode: string
  flag: string
  status: 'ACTIVE' | 'UNDER_CONSTRUCTION' | 'DRAFT' | 'INACTIVE'
  totalGroups: number
  totalStamps: number
}

// Demo data — en producción vendrá de la BD vía Prisma
const COUNTRY_CATALOGS: CountryCatalog[] = [
  { slug: 'peru', nameEs: 'Perú', countryCode: 'PE', flag: '🇵🇪', status: 'ACTIVE', totalGroups: 12, totalStamps: 87 },
  { slug: 'israel', nameEs: 'Israel', countryCode: 'IL', flag: '🇮🇱', status: 'ACTIVE', totalGroups: 8, totalStamps: 54 },
  { slug: 'chile', nameEs: 'Chile', countryCode: 'CL', flag: '🇨🇱', status: 'UNDER_CONSTRUCTION', totalGroups: 0, totalStamps: 0 },
  { slug: 'brasil', nameEs: 'Brasil', countryCode: 'BR', flag: '🇧🇷', status: 'UNDER_CONSTRUCTION', totalGroups: 0, totalStamps: 0 },
  { slug: 'argentina', nameEs: 'Argentina', countryCode: 'AR', flag: '🇦🇷', status: 'DRAFT', totalGroups: 0, totalStamps: 0 },
  { slug: 'mexico', nameEs: 'México', countryCode: 'MX', flag: '🇲🇽', status: 'DRAFT', totalGroups: 0, totalStamps: 0 },
]

const STATUS_LABEL: Record<string, string> = {
  ACTIVE: 'Activo',
  UNDER_CONSTRUCTION: 'En construcción',
  DRAFT: 'Próximamente',
  INACTIVE: 'Inactivo',
}

const STATUS_BADGE: Record<string, string> = {
  ACTIVE: 'badge--active',
  UNDER_CONSTRUCTION: 'badge--wip',
  DRAFT: 'badge--draft',
  INACTIVE: 'badge--inactive',
}

export default function PaisesPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <p className={styles.breadcrumb}>
            <Link href="/catalogos">Catálogos</Link> / Países
          </p>
          <h1 className={styles.title}>Catálogos por País</h1>
          <p className={styles.subtitle}>
            Colecciones filatélicas completas, organizadas cronológicamente por país emisor
          </p>
        </div>
      </header>

      <section className={styles.grid}>
        <div className="container">
          <div className={styles.cards}>
            {COUNTRY_CATALOGS.map((cat) => {
              const isActive = cat.status === 'ACTIVE'
              return (
                <div key={cat.slug} className={`${styles.card} ${!isActive ? styles.cardLocked : ''}`}>
                  <div className={styles.cardTop}>
                    <span className={styles.flag}>{cat.flag}</span>
                    <span className={`badge ${STATUS_BADGE[cat.status]}`}>
                      {STATUS_LABEL[cat.status]}
                    </span>
                  </div>
                  <h2 className={styles.cardName}>{cat.nameEs}</h2>
                  {isActive && (
                    <p className={styles.cardMeta}>
                      {cat.totalGroups} grupos · {cat.totalStamps} estampillas
                    </p>
                  )}
                  {!isActive && (
                    <p className={styles.cardMetaMuted}>Catálogo en preparación</p>
                  )}
                  {isActive ? (
                    <Link
                      href={`/catalogos/${cat.slug}`}
                      className={`btn btn--primary ${styles.cardBtn}`}
                      id={`btn-catalogo-${cat.slug}`}
                    >
                      Ver Catálogo
                    </Link>
                  ) : (
                    <span className={`btn ${styles.cardBtnDisabled}`} aria-disabled="true">
                      {cat.status === 'UNDER_CONSTRUCTION' ? 'En construcción' : 'Próximamente'}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
