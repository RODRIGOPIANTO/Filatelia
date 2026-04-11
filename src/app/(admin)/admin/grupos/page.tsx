import type { Metadata } from 'next'
import Link from 'next/link'
import styles from '@/styles/admin.module.css'

export const metadata: Metadata = { title: 'Gestión de Grupos — Admin' }

const GROUPS = [
  { id: 'g1', catalog: 'Perú 🇵🇪', year: 1857, titleEs: 'Primeros Sellos del Perú', titleEn: 'First Stamps of Peru', stamps: 3, updatedAt: '08/04/2026' },
  { id: 'g2', catalog: 'Perú 🇵🇪', year: 1862, titleEs: 'Escudo de Armas — Dentado', titleEn: 'Coat of Arms — Perforated', stamps: 2, updatedAt: '07/04/2026' },
  { id: 'g3', catalog: 'Perú 🇵🇪', year: 1874, titleEs: 'UPU — Unión Postal Universal', titleEn: 'Universal Postal Union', stamps: 1, updatedAt: '06/04/2026' },
  { id: 'g10', catalog: 'Israel 🇮🇱', year: 1948, titleEs: 'Sellos de la Independencia', titleEn: 'Independence Stamps', stamps: 2, updatedAt: '05/04/2026' },
]

export default function AdminGruposPage() {
  return (
    <>
      <div className={styles.sectionHeader}>
        <h1 className={styles.sectionTitle}>Gestión de Grupos</h1>
        <div className={styles.sectionActions}>
          <Link href="/admin/grupos/nuevo" className="btn btn--primary" id="btn-new-group">
            ➕ Nuevo Grupo
          </Link>
        </div>
      </div>

      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>Todos los Grupos ({GROUPS.length})</h2>
        </div>
        <div style={{ padding: 0, overflowX: 'auto' }}>
          <table className={styles.dataTable} id="groups-table">
            <thead>
              <tr>
                <th>Catálogo</th>
                <th>Año</th>
                <th>Título (ES)</th>
                <th>Título (EN)</th>
                <th>Estampillas</th>
                <th>Última mod.</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {GROUPS.map((g) => (
                <tr key={g.id}>
                  <td style={{ color: 'var(--color-accent)', fontWeight: 500 }}>{g.catalog}</td>
                  <td>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-lg)', color: 'var(--color-text-light)' }}>
                      {g.year}
                    </span>
                  </td>
                  <td>{g.titleEs}</td>
                  <td style={{ color: 'var(--color-text-muted)', fontStyle: 'italic', fontSize: 'var(--fs-sm)' }}>{g.titleEn}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span className="badge badge--active">{g.stamps}</span>
                  </td>
                  <td style={{ color: 'var(--color-text-muted)', fontSize: 'var(--fs-xs)' }}>{g.updatedAt}</td>
                  <td>
                    <div className={styles.tableActions}>
                      <button className={`${styles.actionBtn} ${styles['actionBtn--edit']}`} id={`edit-group-${g.id}`}>
                        Editar
                      </button>
                      <Link href={`/admin/estampillas?group=${g.id}`} className={`${styles.actionBtn} ${styles['actionBtn--view']}`}>
                        Estampillas
                      </Link>
                      <button className={`${styles.actionBtn} ${styles['actionBtn--delete']}`}>
                        Eliminar
                      </button>
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
