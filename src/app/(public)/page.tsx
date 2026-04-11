import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Filatelia Peruana — La Primera Tienda Filatélica Online del Perú',
  description:
    'Bienvenidos a la primera tienda filatélica online del Perú. Catálogos digitales tipo álbum y accesorios para coleccionistas.',
}

// ─── Contador de visitas estático (futuro: fetch a /api/visits) ─────────────
async function getVisitCount(): Promise<number> {
  // En fase 1 devolvemos un valor demo; en producción se conectará a DB
  return 12_847
}

export default async function HomePage() {
  const visitCount = await getVisitCount()

  return (
    <>
      {/* ══════════════ BLOQUE 1 — HERO ══════════════ */}
      <section className={styles.hero} aria-label="Bienvenida">
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.heroPretitle}>La primera tienda filatélica online del Perú</span>
          <h1 className={styles.heroTitle}>
            Bienvenidos A La Primera<br />
            <span className={styles.heroAccent}>Tienda Filatélica</span><br />
            Del Perú Online
          </h1>
          <p className={styles.heroSubtitle}>
            Catálogos digitales tipo álbum, sellos históricos y accesorios para coleccionistas
          </p>
          <div className={styles.heroActions}>
            <Link href="/catalogos" className="btn btn--primary" id="hero-catalogos-btn">
              Ver Catálogos
            </Link>
            <Link href="/auth/register" className="btn btn--outline" id="hero-register-btn">
              Regístrese
            </Link>
          </div>
        </div>
        <div className={styles.heroScroll}>
          <span>◆</span>
        </div>
      </section>

      {/* ══════════════ BLOQUE 2 — CATÁLOGOS ══════════════ */}
      <section className={styles.section} aria-labelledby="catalogs-heading">
        <div className="container">
          <h2 id="catalogs-heading" className={styles.sectionTitle}>Nuestros Catálogos</h2>
          <p className={styles.sectionSubtitle}>
            Explore colecciones filatélicas organizadas con diseño tipo álbum
          </p>
          <div className={styles.catalogGrid}>
            {/* Países */}
            <Link href="/catalogos/paises" className={styles.catalogCard} id="card-paises">
              <div className={styles.catalogCardBg} style={{ backgroundImage: "url('/images/flags-collage.jpg')" }} />
              <div className={styles.catalogCardOverlay} />
              <div className={styles.catalogCardContent}>
                <span className={styles.catalogCardIcon}>🌍</span>
                <h3 className={styles.catalogCardTitle}>Por Países</h3>
                <p className={styles.catalogCardDesc}>
                  Perú, Israel y muchos más países con sus emisiones completas
                </p>
                <span className={styles.catalogCardCta}>Explorar →</span>
              </div>
            </Link>
            {/* Temáticas */}
            <Link href="/catalogos/tematicas" className={styles.catalogCard} id="card-tematicas">
              <div className={styles.catalogCardBg} style={{ backgroundImage: "url('/images/stamps-collage.jpg')" }} />
              <div className={styles.catalogCardOverlay} />
              <div className={styles.catalogCardContent}>
                <span className={styles.catalogCardIcon}>🎨</span>
                <h3 className={styles.catalogCardTitle}>Por Temáticas</h3>
                <p className={styles.catalogCardDesc}>
                  Flora, fauna, deportes, aviación y 15 temáticas de coleccionistas
                </p>
                <span className={styles.catalogCardCta}>Explorar →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════ BLOQUE 3 — TIENDA ══════════════ */}
      <section className={styles.section} aria-labelledby="store-heading">
        <div className="container">
          <h2 id="store-heading" className={styles.sectionTitle}>Nuestra Tienda</h2>
          <p className={styles.sectionSubtitle}>
            Accesorios y álbumes para el coleccionista serio
          </p>
          <div className={styles.catalogGrid}>
            <Link href="/tienda?categoria=accesorios" className={styles.storeCard} id="card-accesorios">
              <div className={styles.catalogCardBg} style={{ backgroundImage: "url('/images/accesorios.jpg')" }} />
              <div className={styles.catalogCardOverlay} />
              <div className={styles.catalogCardContent}>
                <span className={styles.catalogCardIcon}>📎</span>
                <h3 className={styles.catalogCardTitle}>Accesorios</h3>
                <p className={styles.catalogCardDesc}>
                  Estuches, pinzas, lupas y material filatélico profesional
                </p>
                <span className={styles.catalogCardCta}>Ver Accesorios →</span>
              </div>
            </Link>
            <Link href="/tienda?categoria=albumes" className={styles.storeCard} id="card-albumes">
              <div className={styles.catalogCardBg} style={{ backgroundImage: "url('/images/albumes.jpg')" }} />
              <div className={styles.catalogCardOverlay} />
              <div className={styles.catalogCardContent}>
                <span className={styles.catalogCardIcon}>📚</span>
                <h3 className={styles.catalogCardTitle}>Álbumes</h3>
                <p className={styles.catalogCardDesc}>
                  Álbumes clasificadores de distintos formatos y capacidades
                </p>
                <span className={styles.catalogCardCta}>Ver Álbumes →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════ BLOQUE 4 — CONTADOR DE VISITAS ══════════════ */}
      <section className={styles.visitSection} aria-label="Visitas al sitio">
        <div className="container">
          <p className={styles.visitLabel}>Coleccionistas que nos han visitado</p>
          <p className={styles.visitCount} id="visit-counter">
            {visitCount.toLocaleString('es-PE')}
          </p>
          <p className={styles.visitSub}>visitas y contando</p>
        </div>
      </section>
    </>
  )
}
