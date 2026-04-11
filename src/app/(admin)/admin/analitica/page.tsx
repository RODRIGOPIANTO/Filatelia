import type { Metadata } from 'next'
import styles from '@/styles/admin.module.css'
import analiticaStyles from './analitica.module.css'

export const metadata: Metadata = { title: 'Analítica — Admin' }

const VISITS_BY_COUNTRY = [
  { country: '🇵🇪 Perú', visits: 5820, pct: 45 },
  { country: '🇦🇷 Argentina', visits: 2310, pct: 18 },
  { country: '🇨🇱 Chile', visits: 1540, pct: 12 },
  { country: '🇪🇸 España', visits: 1028, pct: 8 },
  { country: '🇺🇸 Estados Unidos', visits: 900, pct: 7 },
  { country: '🌍 Otros', visits: 1249, pct: 10 },
]

const VIEWS_BY_CATALOG = [
  { catalog: '🇵🇪 Perú', views: 8210, change: '+12%' },
  { catalog: '🇮🇱 Israel', views: 3440, change: '+5%' },
  { catalog: '🌍 Catálogo General', views: 1197, change: '+3%' },
]

const MONTHLY_STATS = [
  { month: 'Ene 2026', visits: 980 },
  { month: 'Feb 2026', visits: 1120 },
  { month: 'Mar 2026', visits: 1340 },
  { month: 'Abr 2026', visits: 1203 },
]
const maxVisits = Math.max(...MONTHLY_STATS.map(m => m.visits))

export default function AnaliticaPage() {
  return (
    <>
      <div className={styles.sectionHeader}>
        <h1 className={styles.sectionTitle}>Analítica</h1>
      </div>

      {/* Top stats */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Visitas Totales</p>
          <p className={styles.statValue} style={{ color: 'var(--color-accent)' }}>12.847</p>
          <p className={styles.statSub}>Desde el inicio</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Este Mes</p>
          <p className={styles.statValue} style={{ color: 'var(--color-primary-light)' }}>1.203</p>
          <p className={styles.statSub}>Abril 2026</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Vistas Catálogo Perú</p>
          <p className={styles.statValue} style={{ color: 'var(--color-text-light)' }}>8.210</p>
          <p className={styles.statSub}>+12% vs. mes anterior</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Vistas Catálogo Israel</p>
          <p className={styles.statValue} style={{ color: 'var(--color-text-light)' }}>3.440</p>
          <p className={styles.statSub}>+5% vs. mes anterior</p>
        </div>
      </div>

      <div className={analiticaStyles.grid2}>
        {/* Visitas por país */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>Visitas por País</h2>
          </div>
          <div className={styles.panelBody}>
            {VISITS_BY_COUNTRY.map((v) => (
              <div key={v.country} className={analiticaStyles.barRow}>
                <span className={analiticaStyles.barLabel}>{v.country}</span>
                <div className={analiticaStyles.barTrack}>
                  <div
                    className={analiticaStyles.barFill}
                    style={{ width: `${v.pct}%` }}
                  />
                </div>
                <span className={analiticaStyles.barValue}>{v.visits.toLocaleString('es-PE')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Vistas por catálogo */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>Vistas por Catálogo</h2>
          </div>
          <div className={styles.panelBody} style={{ padding: 0 }}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Catálogo</th>
                  <th style={{ textAlign: 'center' }}>Vistas</th>
                  <th style={{ textAlign: 'center' }}>Cambio</th>
                </tr>
              </thead>
              <tbody>
                {VIEWS_BY_CATALOG.map((v) => (
                  <tr key={v.catalog}>
                    <td style={{ fontWeight: 500 }}>{v.catalog}</td>
                    <td style={{ textAlign: 'center', color: 'var(--color-text-light)', fontFamily: 'var(--font-display)' }}>
                      {v.views.toLocaleString('es-PE')}
                    </td>
                    <td style={{ textAlign: 'center', color: 'var(--color-primary-light)' }}>{v.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Monthly chart (bar chart via CSS) */}
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>Tendencia Mensual de Visitas</h2>
        </div>
        <div className={styles.panelBody}>
          <div className={analiticaStyles.chartBars}>
            {MONTHLY_STATS.map((m) => (
              <div key={m.month} className={analiticaStyles.chartBarCol}>
                <span className={analiticaStyles.chartBarNum}>{m.visits.toLocaleString('es-PE')}</span>
                <div
                  className={analiticaStyles.chartBar}
                  style={{ height: `${(m.visits / maxVisits) * 180}px` }}
                />
                <span className={analiticaStyles.chartBarMonth}>{m.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
