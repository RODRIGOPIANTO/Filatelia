import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Catálogos Filatélicos — Filatelia Peruana',
  description:
    'Explore colecciones filatélicas organizadas por países y temáticas. Catálogos digitales con diseño de álbum elegante.',
}

import CatalogGrid from '@/components/catalog/CatalogGrid'
import styles from './page.module.css'

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

      <section className={styles.gridSection}>
        <div className="container">
          <CatalogGrid />
        </div>
      </section>
    </div>
  )
}
