import type { Metadata } from 'next'
import styles from '@/styles/admin.module.css'

export const metadata: Metadata = { title: 'Últimas Modificaciones — Admin' }

const MODIFICATIONS = [
  { catalog: 'Perú', action: 'Grupo añadido', detail: 'UPU — Unión Postal Universal (1874)', date: '08/04/2026 09:30', user: 'admin' },
  { catalog: 'Israel', action: 'Estampilla editada', detail: 'Scott #2 · Valor facial: 5m · Color: Verde', date: '07/04/2026 18:15', user: 'admin' },
  { catalog: 'Perú', action: 'Estampilla publicada', detail: 'Scott #21 · UPU 1874', date: '07/04/2026 15:00', user: 'admin' },
  { catalog: 'Perú', action: 'Catálogo activado', detail: 'Estado cambiado: Borrador → Activo', date: '05/04/2026 11:00', user: 'admin' },
  { catalog: 'Israel', action: 'Catálogo activado', detail: 'Estado cambiado: Borrador → Activo', date: '05/04/2026 10:45', user: 'admin' },
  { catalog: 'Chile', action: 'Estado actualizado', detail: 'Estado cambiado: Borrador → En construcción', date: '04/04/2026 16:30', user: 'admin' },
  { catalog: 'Brasil', action: 'Estado actualizado', detail: 'Estado cambiado: Borrador → En construcción', date: '04/04/2026 16:28', user: 'admin' },
  { catalog: 'Perú', action: 'Grupo añadido', detail: 'Escudo de Armas — Dentado (1862)', date: '03/04/2026 12:00', user: 'admin' },
  { catalog: 'Perú', action: 'Grupo añadido', detail: 'Primeros Sellos del Perú (1857)', date: '02/04/2026 09:00', user: 'admin' },
  { catalog: 'Israel', action: 'Grupo añadido', detail: 'Sellos de la Independencia (1948)', date: '01/04/2026 14:30', user: 'admin' },
]

const ACTION_COLORS: Record<string, string> = {
  'Grupo añadido': 'var(--color-primary-light)',
  'Estampilla editada': 'var(--color-accent)',
  'Estampilla publicada': 'var(--color-status-active)',
  'Catálogo activado': 'var(--color-status-active)',
  'Estado actualizado': 'var(--color-status-wip)',
}

export default function ModificacionesPage() {
  return (
    <>
      <div className={styles.sectionHeader}>
        <h1 className={styles.sectionTitle}>Últimas Modificaciones</h1>
      </div>

      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>Historial de cambios ({MODIFICATIONS.length})</h2>
        </div>
        <div style={{ padding: 0, overflowX: 'auto' }}>
          <table className={styles.dataTable} id="modifications-table">
            <thead>
              <tr>
                <th>Catálogo</th>
                <th>Acción</th>
                <th>Detalle</th>
                <th>Fecha y hora</th>
                <th>Usuario</th>
              </tr>
            </thead>
            <tbody>
              {MODIFICATIONS.map((m, i) => (
                <tr key={i}>
                  <td style={{ color: 'var(--color-accent)', fontWeight: 500 }}>{m.catalog}</td>
                  <td>
                    <span style={{ color: ACTION_COLORS[m.action] ?? 'var(--color-text-light)', fontWeight: 500 }}>
                      {m.action}
                    </span>
                  </td>
                  <td style={{ color: 'var(--color-text-muted)', fontSize: 'var(--fs-sm)' }}>{m.detail}</td>
                  <td style={{ color: 'var(--color-text-muted)', fontSize: 'var(--fs-xs)', whiteSpace: 'nowrap' }}>{m.date}</td>
                  <td style={{ color: 'var(--color-text-muted)', fontSize: 'var(--fs-xs)' }}>{m.user}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
