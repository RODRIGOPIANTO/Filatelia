import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Catálogos Filatélicos — Filatelia Peruana',
  description:
    'Explore colecciones filatélicas organizadas por países y temáticas. Catálogos digitales con diseño de álbum elegante.',
}

export default function CatalogosLandingPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>Catálogos Filatélicos</h1>
          <p className={styles.subtitle}>
            Explore nuestras colecciones digitales con diseño tipo álbum
          </p>
        </div>
      </header>

      <section className={styles.grid}>
        <div className="container">
          <div className={styles.cards}>
            {/* Países */}
            <Link href="/catalogos/paises" className={styles.card} id="landing-paises">
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>🌎</span>
                <h2 className={styles.cardTitle}>Por Países</h2>
              </div>
              <p className={styles.cardDesc}>
                Colecciones organizadas por país emisor. Actualmente: Perú, Israel y más en construcción.
              </p>
              <div className={styles.cardBadges}>
                <span className="badge badge--active">Perú — Activo</span>
                <span className="badge badge--active">Israel — Activo</span>
                <span className="badge badge--wip">Chile — En construcción</span>
                <span className="badge badge--wip">Brasil — En construcción</span>
              </div>
              <span className={styles.cardCta}>Ver catálogos por país →</span>
            </Link>

            {/* Temáticas */}
            <Link href="/catalogos/tematicas" className={styles.card} id="landing-tematicas">
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>🎨</span>
                <h2 className={styles.cardTitle}>Por Temáticas</h2>
              </div>
              <p className={styles.cardDesc}>
                Colecciones transversales organizadas por tema: Flora, Fauna, Deportes, Aviación y más.
              </p>
              <div className={styles.cardBadges}>
                <span className="badge badge--draft">Flora</span>
                <span className="badge badge--draft">Fauna</span>
                <span className="badge badge--draft">Deportes</span>
                <span className="badge badge--draft">Aviación</span>
              </div>
              <span className={styles.cardCta}>Ver catálogos temáticos →</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
