import type { Metadata } from 'next'
import Link from 'next/link'
import styles from '@/styles/admin.module.css'
import dashStyles from './dashboard.module.css'

export const metadata: Metadata = {
  title: 'Dashboard — Admin',
}

// Demo stats — en producción, fetch desde Prisma
const STATS = [
  { label: 'Catálogos Activos', value: '2', sub: 'Perú, Israel', color: 'var(--color-status-active)' },
  { label: 'Total Grupos', value: '20', sub: '3 grupos Perú · 1 Israel', color: 'var(--color-accent)' },
  { label: 'Total Estampillas', value: '141', sub: '87 Perú · 54 Israel', color: 'var(--color-primary-light)' },
  { label: 'Visitas Totales', value: '12.847', sub: 'Último mes: 1.203', color: 'var(--color-text-muted)' },
]

const RECENT_MODIFICATIONS = [
  { catalog: 'Perú', action: 'Grupo añadido: UPU 1874', date: '08/04/2026 09:30', user: 'admin' },
  { catalog: 'Israel', action: 'Estampilla editada: Scott #2', date: '07/04/2026 18:15', user: 'admin' },
  { catalog: 'Perú', action: 'Catálogo activado', date: '05/04/2026 11:00', user: 'admin' },
  { catalog: 'Israel', action: 'Catálogo activado', date: '05/04/2026 10:45', user: 'admin' },
  { catalog: 'Chile', action: 'Estado cambiado: En construcción', date: '04/04/2026 16:30', user: 'admin' },
]

const CATALOG_STATUS_OVERVIEW = [
  { nameEs: 'Perú', flag: '🇵🇪', status: 'ACTIVE', groups: 3, stamps: 87 },
  { nameEs: 'Israel', flag: '🇮🇱', status: 'ACTIVE', groups: 1, stamps: 54 },
  { nameEs: 'Chile', flag: '🇨🇱', status: 'UNDER_CONSTRUCTION', groups: 0, stamps: 0 },
  { nameEs: 'Brasil', flag: '🇧🇷', status: 'UNDER_CONSTRUCTION', groups: 0, stamps: 0 },
]

const STATUS_BADGE: Record<string, string> = {
  ACTIVE: 'badge--active',
  UNDER_CONSTRUCTION: 'badge--wip',
  DRAFT: 'badge--draft',
  INACTIVE: 'badge--inactive',
}
const STATUS_LABEL: Record<string, string> = {
  ACTIVE: 'Activo',
  UNDER_CONSTRUCTION: 'En construcción',
  DRAFT: 'Borrador',
  INACTIVE: 'Inactivo',
}

export default function DashboardPage() {
  return (
    <>
      <div className={styles.sectionHeader}>
        <h1 className={styles.sectionTitle}>Dashboard</h1>
      </div>

      {/* Stats cards */}
      <div className={styles.statsGrid} id="stats-grid">
        {STATS.map((s) => (
          <div key={s.label} className={styles.statCard}>
            <p className={styles.statLabel}>{s.label}</p>
            <p className={styles.statValue} style={{ color: s.color }}>{s.value}</p>
            <p className={styles.statSub}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Two column layout */}
      <div className={dashStyles.grid2}>
        {/* Catálogos overview */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>Estado de Catálogos</h2>
            <Link href="/admin/catalogos" className="btn btn--outline btn--sm" id="goto-catalogs">
              Gestionar →
            </Link>
          </div>
          <div className={styles.panelBody} style={{ padding: 0 }}>
            <table className={styles.dataTable} id="catalog-status-table">
              <thead>
                <tr>
                  <th>País</th>
                  <th>Estado</th>
                  <th>Grupos</th>
                  <th>Estampillas</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {CATALOG_STATUS_OVERVIEW.map((cat) => (
                  <tr key={cat.nameEs}>
                    <td>{cat.flag} {cat.nameEs}</td>
                    <td><span className={`badge ${STATUS_BADGE[cat.status]}`}>{STATUS_LABEL[cat.status]}</span></td>
                    <td>{cat.groups}</td>
                    <td>{cat.stamps}</td>
                    <td>
                      {cat.status === 'ACTIVE' && (
                        <Link href={`/catalogos/${cat.nameEs.toLowerCase()}`} className={styles.actionBtn + ' ' + styles['actionBtn--view']} target="_blank">
                          Ver
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Últimas modificaciones */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>Últimas Modificaciones</h2>
            <Link href="/admin/modificaciones" className="btn btn--outline btn--sm" id="goto-mods">
              Ver todo →
            </Link>
          </div>
          <div className={styles.panelBody} style={{ padding: 0 }}>
            <table className={styles.dataTable} id="recent-mods-table">
              <thead>
                <tr>
                  <th>Catálogo</th>
                  <th>Acción</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_MODIFICATIONS.map((m, i) => (
                  <tr key={i}>
                    <td style={{ color: 'var(--color-accent)', fontWeight: 500 }}>{m.catalog}</td>
                    <td>{m.action}</td>
                    <td style={{ color: 'var(--color-text-muted)', fontSize: 'var(--fs-xs)', whiteSpace: 'nowrap' }}>{m.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>Acciones Rápidas</h2>
        </div>
        <div className={styles.panelBody}>
          <div className={dashStyles.quickActions}>
            <Link href="/admin/catalogos/nuevo" className="btn btn--primary" id="qa-new-catalog">➕ Nuevo Catálogo</Link>
            <Link href="/admin/grupos/nuevo" className="btn btn--primary" id="qa-new-group">📂 Nuevo Grupo</Link>
            <Link href="/admin/estampillas/nueva" className="btn btn--primary" id="qa-new-stamp">🏷️ Nueva Estampilla</Link>
            <Link href="/admin/importar" className="btn btn--outline" id="qa-import">📊 Importar Excel</Link>
          </div>
        </div>
      </div>
    </>
  )
}
