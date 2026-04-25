'use client'
import { useState, useRef } from 'react'
import type { Metadata } from 'next'
import styles from '@/styles/admin.module.css'
import importStyles from './importar.module.css'

// Types for the import result display
interface RowError { rowNumber: number; issues: string[]; rawData: Record<string, unknown> }
interface ImportResult {
  total: number
  ok: number
  errors: RowError[]
  fileName: string
}

export default function ImportarPage() {
  const [dragActive, setDragActive] = useState(false)
  const [importing, setImporting] = useState(false)
  const [result, setResult] = useState<ImportResult | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  function handleDrag(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(e.type === 'dragenter' || e.type === 'dragover')
  }

  async function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragActive(false)
    const file = e.dataTransfer.files?.[0]
    if (file) processFile(file)
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) processFile(file)
  }

  async function processFile(file: File) {
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      alert('Solo se aceptan archivos .xlsx o .xls')
      return
    }
    setImporting(true)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/import', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Error en el servidor al importar')

      const data = await res.json()
      setResult(data)
    } catch (err: any) {
      alert(err.message)
    } finally {
      setImporting(false)
    }
  }

  function downloadTemplate() {
    // En producción: fetch('/api/import/template') para descargar xlsx real
    alert('Función disponible en producción. La plantilla incluirá columnas: country_iso, catalog_system, catalog_number, issue_date, face_value, title_es, title_en, group_year, group_title_es, etc.')
  }

  return (
    <>
      <div className={styles.sectionHeader}>
        <h1 className={styles.sectionTitle}>Importar desde Excel</h1>
        <div className={styles.sectionActions}>
          <button className="btn btn--outline" onClick={downloadTemplate} id="btn-download-template">
            ⬇ Descargar Plantilla
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>Formato de Importación</h2>
        </div>
        <div className={styles.panelBody}>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--sp-4)', fontSize: 'var(--fs-sm)', lineHeight: 1.7 }}>
            Cada fila del Excel representa <strong style={{ color: 'var(--color-text-light)' }}>una estampilla</strong>. Si un grupo tiene N estampillas, repita el título del grupo en N filas.
          </p>
          <div className={importStyles.columnsGrid}>
            {[
              { col: 'country_iso', type: 'VARCHAR(2)', req: true, desc: 'Código ISO país (PE, IL, US)' },
              { col: 'catalog_system', type: 'ENUM', req: true, desc: 'scott · michel · yvert · stanley_gibbons · facit' },
              { col: 'catalog_number', type: 'VARCHAR(50)', req: true, desc: 'Número de catálogo (Ej: C13A, 1, 21)' },
              { col: 'issue_date', type: 'DATE', req: true, desc: 'Formato yyyy-mm-dd' },
              { col: 'face_value', type: 'VARCHAR(50)', req: true, desc: 'Valor facial (1d, S/. 1.20, 3m)' },
              { col: 'title_es', type: 'VARCHAR(200)', req: true, desc: 'Título de la estampilla en español' },
              { col: 'group_year', type: 'INTEGER', req: true, desc: 'Año del grupo (Ej: 1857)' },
              { col: 'group_title_es', type: 'VARCHAR(200)', req: true, desc: 'Título del grupo en español' },
              { col: 'title_en', type: 'VARCHAR(200)', req: false, desc: 'Título en inglés (opcional)' },
              { col: 'group_title_en', type: 'VARCHAR(200)', req: false, desc: 'Título del grupo en inglés (opcional)' },
              { col: 'print_run', type: 'BIGINT', req: false, desc: 'Cantidad emitida (tiraje)' },
              { col: 'perforation', type: 'VARCHAR(50)', req: false, desc: 'Medida de dentado (Ej: 11.2 x 11.4)' },
              { col: 'color', type: 'VARCHAR(100)', req: false, desc: 'Color del sello (Azul, Rojo, Verde…)' },
              { col: 'image_url', type: 'VARCHAR(500)', req: false, desc: 'URL de imagen del sello' },
            ].map((c) => (
              <div key={c.col} className={importStyles.columnRow}>
                <code className={importStyles.colName}>{c.col}</code>
                <span className={importStyles.colType}>{c.type}</span>
                <span className={`badge ${c.req ? 'badge--active' : 'badge--draft'}`}>{c.req ? 'Requerido' : 'Opcional'}</span>
                <span className={importStyles.colDesc}>{c.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upload zone */}
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>Cargar Archivo</h2>
        </div>
        <div className={styles.panelBody}>
          <div
            className={`${styles.uploadZone} ${dragActive ? styles['uploadZone--active'] : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            role="button"
            tabIndex={0}
            aria-label="Zona de carga de archivo Excel"
            id="upload-zone"
          >
            <div className={styles.uploadZoneIcon}>📊</div>
            <p className={styles.uploadZoneText}>
              <strong>Arrastra tu archivo Excel aquí</strong> o haz clic para seleccionarlo
            </p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--fs-xs)', marginTop: 'var(--sp-2)' }}>
              Solo archivos .xlsx o .xls · Máximo 10MB
            </p>
            <input
              ref={fileRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="file-input"
            />
          </div>

          {importing && (
            <div className={importStyles.processing}>
              <div className={importStyles.spinner} />
              <p>Procesando archivo…</p>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className={styles.panel} id="import-results">
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>Resultado de Importación: {result.fileName}</h2>
            <div style={{ display: 'flex', gap: 'var(--sp-3)' }}>
              <span className={`${styles.importResultBadge} ${styles['importResultBadge--ok']}`}>
                ✓ {result.ok} importadas
              </span>
              {result.errors.length > 0 && (
                <span className={`${styles.importResultBadge} ${styles['importResultBadge--error']}`}>
                  ✗ {result.errors.length} errores
                </span>
              )}
            </div>
          </div>
          <div className={styles.panelBody}>
            <div className={importStyles.resultSummary}>
              <div className={importStyles.resultStat}>
                <span className={importStyles.resultStatNum} style={{ color: 'var(--color-primary-light)' }}>{result.total}</span>
                <span>Total filas</span>
              </div>
              <div className={importStyles.resultStat}>
                <span className={importStyles.resultStatNum} style={{ color: 'var(--color-status-active)' }}>{result.ok}</span>
                <span>Correctas</span>
              </div>
              <div className={importStyles.resultStat}>
                <span className={importStyles.resultStatNum} style={{ color: 'var(--color-status-inactive)' }}>{result.errors.length}</span>
                <span>Con error</span>
              </div>
            </div>

            {result.errors.length > 0 && (
              <>
                <h3 style={{ color: 'var(--color-text-light)', fontFamily: 'var(--font-display)', fontSize: 'var(--fs-lg)', margin: 'var(--sp-6) 0 var(--sp-4)' }}>
                  Filas con errores
                </h3>
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>Fila</th>
                      <th>Errores</th>
                      <th>Datos recibidos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.errors.map((err) => (
                      <tr key={err.rowNumber}>
                        <td style={{ color: 'var(--color-status-inactive)', fontWeight: 600 }}>#{err.rowNumber}</td>
                        <td>
                          {err.issues.map((issue, i) => (
                            <div key={i} style={{ color: 'var(--color-status-inactive)', fontSize: 'var(--fs-xs)', marginBottom: '2px' }}>• {issue}</div>
                          ))}
                        </td>
                        <td>
                          <code style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-text-muted)', display: 'block', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {JSON.stringify(err.rawData)}
                          </code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
