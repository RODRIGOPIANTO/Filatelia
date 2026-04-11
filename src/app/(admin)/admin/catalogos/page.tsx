import type { Metadata } from 'next'
import Link from 'next/link'
import styles from '@/styles/admin.module.css'

export const metadata: Metadata = { title: 'Gestión de Catálogos — Admin' }

const CATALOGS = [
  { id: 'c1', slug: 'peru', nameEs: 'Perú', flag: '🇵🇪', type: 'COUNTRY', status: 'ACTIVE', groups: 3, stamps: 87, updatedAt: '08/04/2026' },
  { id: 'c2', slug: 'israel', nameEs: 'Israel', flag: '🇮🇱', type: 'COUNTRY', status: 'ACTIVE', groups: 1, stamps: 54, updatedAt: '07/04/2026' },
  { id: 'c3', slug: 'chile', nameEs: 'Chile', flag: '🇨🇱', type: 'COUNTRY', status: 'UNDER_CONSTRUCTION', groups: 0, stamps: 0, updatedAt: '04/04/2026' },
  { id: 'c4', slug: 'brasil', nameEs: 'Brasil', flag: '🇧🇷', type: 'COUNTRY', status: 'UNDER_CONSTRUCTION', groups: 0, stamps: 0, updatedAt: '04/04/2026' },
  { id: 'c5', slug: 'argentina', nameEs: 'Argentina', flag: '🇦🇷', type: 'COUNTRY', status: 'DRAFT', groups: 0, stamps: 0, updatedAt: '01/04/2026' },
]

const STATUS_BADGE: Record<string, string> = {
  ACTIVE: 'badge--active', UNDER_CONSTRUCTION: 'badge--wip', DRAFT: 'badge--draft', INACTIVE: 'badge--inactive',
}
const STATUS_LABEL: Record<string, string> = {
  ACTIVE: 'Activo', UNDER_CONSTRUCTION: 'En construcción', DRAFT: 'Borrador', INACTIVE: 'Inactivo',
}

export default function AdminCatalogsPage() {
  return (
    <>
      <div className={styles.sectionHeader}>
        <h1 className={styles.sectionTitle}>Gestión de Catálogos</h1>
        <div className={styles.sectionActions}>
          <Link href="/admin/catalogos/nuevo" className="btn btn--primary" id="btn-new-catalog">
            ➕ Nuevo Catálogo
          </Link>
        </div>
      </div>

      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>Todos los Catálogos ({CATALOGS.length})</h2>
        </div>
        <div style={{ padding: 0, overflowX: 'auto' }}>
          <table className={styles.dataTable} id="catalogs-table">
            <thead>
              <tr>
                <th>País</th>
                <th>Slug</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Grupos</th>
                <th>Estampillas</th>
                <th>Última modificación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {CATALOGS.map((cat) => (
                <tr key={cat.id}>
                  <td style={{ fontWeight: 500 }}>{cat.flag} {cat.nameEs}</td>
                  <td style={{ color: 'var(--color-text-muted)', fontFamily: 'monospace', fontSize: 'var(--fs-xs)' }}>{cat.slug}</td>
                  <td style={{ color: 'var(--color-text-muted)' }}>{cat.type === 'COUNTRY' ? 'País' : 'Temática'}</td>
                  <td><span className={`badge ${STATUS_BADGE[cat.status]}`}>{STATUS_LABEL[cat.status]}</span></td>
                  <td style={{ textAlign: 'center' }}>{cat.groups}</td>
                  <td style={{ textAlign: 'center' }}>{cat.stamps}</td>
                  <td style={{ color: 'var(--color-text-muted)', fontSize: 'var(--fs-xs)' }}>{cat.updatedAt}</td>
                  <td>
                    <div className={styles.tableActions}>
                      <Link href={`/admin/catalogos/${cat.slug}/editar`} className={`${styles.actionBtn} ${styles['actionBtn--edit']}`} id={`edit-${cat.slug}`}>
                        Editar
                      </Link>
                      <Link href={`/admin/grupos?catalog=${cat.slug}`} className={`${styles.actionBtn} ${styles['actionBtn--view']}`}>
                        Grupos
                      </Link>
                      {cat.status === 'ACTIVE' && (
                        <Link href={`/catalogos/${cat.slug}`} className={`${styles.actionBtn} ${styles['actionBtn--view']}`} target="_blank">
                          Ver ↗
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
