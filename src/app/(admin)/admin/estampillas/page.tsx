import type { Metadata } from 'next'
import Link from 'next/link'
import styles from '@/styles/admin.module.css'

export const metadata: Metadata = { title: 'Gestión de Estampillas — Admin' }

const STAMPS = [
  { id: 's1', catalog: 'Perú', group: 'Primeros Sellos del Perú', year: 1857, faceValue: '1d', color: 'Azul', scott: '1', michel: '1', yvert: '-', perf: 'Imperf', published: true },
  { id: 's2', catalog: 'Perú', group: 'Primeros Sellos del Perú', year: 1857, faceValue: '1r', color: 'Rojo', scott: '2', michel: '2', yvert: '-', perf: 'Imperf', published: true },
  { id: 's3', catalog: 'Perú', group: 'Primeros Sellos del Perú', year: 1858, faceValue: '1r', color: 'Marrón', scott: '3', michel: '-', yvert: '-', perf: 'Imperf', published: true },
  { id: 's4', catalog: 'Perú', group: 'Escudo Dentado', year: 1862, faceValue: '1d', color: 'Rojo', scott: '10', michel: '-', yvert: '10', perf: '12', published: true },
  { id: 's5', catalog: 'Perú', group: 'Escudo Dentado', year: 1862, faceValue: '1d', color: 'Verde', scott: '11', michel: '-', yvert: '-', perf: '12', published: true },
  { id: 's6', catalog: 'Perú', group: 'UPU', year: 1874, faceValue: '2c', color: 'Violeta', scott: '21', michel: '21', yvert: '21', perf: '12', published: true },
  { id: 's10', catalog: 'Israel', group: 'Sellos Independencia', year: 1948, faceValue: '3m', color: 'Azul', scott: '1', michel: '-', yvert: '-', perf: '11', published: true },
  { id: 's11', catalog: 'Israel', group: 'Sellos Independencia', year: 1948, faceValue: '5m', color: 'Verde', scott: '2', michel: '-', yvert: '-', perf: '11', published: true },
]

export default function AdminEstampillasPage() {
  return (
    <>
      <div className={styles.sectionHeader}>
        <h1 className={styles.sectionTitle}>Gestión de Estampillas</h1>
        <div className={styles.sectionActions}>
          <Link href="/admin/estampillas/nueva" className="btn btn--primary" id="btn-new-stamp">
            ➕ Nueva Estampilla
          </Link>
        </div>
      </div>

      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>Todas las Estampillas ({STAMPS.length})</h2>
        </div>
        <div style={{ padding: 0, overflowX: 'auto' }}>
          <table className={styles.dataTable} id="stamps-table">
            <thead>
              <tr>
                <th>Catálogo</th>
                <th>Grupo</th>
                <th>Año</th>
                <th>Valor</th>
                <th>Color</th>
                <th>Scott</th>
                <th>Michel</th>
                <th>Yvert</th>
                <th>Perf.</th>
                <th>Publicado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {STAMPS.map((s) => (
                <tr key={s.id}>
                  <td style={{ color: 'var(--color-accent)', fontWeight: 500 }}>{s.catalog}</td>
                  <td style={{ color: 'var(--color-text-muted)', fontSize: 'var(--fs-xs)' }}>{s.group}</td>
                  <td>{s.year}</td>
                  <td style={{ fontWeight: 600 }}>{s.faceValue}</td>
                  <td style={{ color: 'var(--color-text-muted)' }}>{s.color}</td>
                  <td style={{ fontFamily: 'monospace' }}>{s.scott}</td>
                  <td style={{ fontFamily: 'monospace', color: s.michel === '-' ? 'var(--color-text-muted)' : 'inherit' }}>{s.michel}</td>
                  <td style={{ fontFamily: 'monospace', color: s.yvert === '-' ? 'var(--color-text-muted)' : 'inherit' }}>{s.yvert}</td>
                  <td style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-text-muted)' }}>{s.perf}</td>
                  <td>
                    <span className={`badge ${s.published ? 'badge--active' : 'badge--draft'}`}>
                      {s.published ? 'Sí' : 'No'}
                    </span>
                  </td>
                  <td>
                    <div className={styles.tableActions}>
                      <button className={`${styles.actionBtn} ${styles['actionBtn--edit']}`} id={`edit-stamp-${s.id}`}>
                        Editar
                      </button>
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
