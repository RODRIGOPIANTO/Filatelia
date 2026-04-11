import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './page.module.css'
import { STAMP_THEMES } from '@/types/catalog'

export const metadata: Metadata = {
  title: 'Catálogos Temáticos — Filatelia Peruana',
  description: 'Explore colecciones filatélicas organizadas por temática: flora, fauna, deportes, aviación y más.',
}

export default function TematicasPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <p className={styles.breadcrumb}>
            <Link href="/catalogos">Catálogos</Link> / Temáticas
          </p>
          <h1 className={styles.title}>Catálogos por Temática</h1>
          <p className={styles.subtitle}>
            Colecciones transversales de estampillas agrupadas por su tema representativo
          </p>
        </div>
      </header>

      <section className={styles.grid}>
        <div className="container">
          <div className={styles.cards}>
            {STAMP_THEMES.map((theme) => (
              <div key={theme.slug} className={styles.card}>
                <div className={styles.cardInner}>
                  <h2 className={styles.cardName}>{theme.nameEs}</h2>
                  <span className="badge badge--draft">Próximamente</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
