'use client'
import { useState } from 'react'
import styles from './page.module.css'

export default function ScannerPage() {
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleScan = async () => {
    if (!image) return
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('/api/ai/scanner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image }),
      })

      if (!res.ok) throw new Error('Error al procesar la imagen')

      const data = await res.json()
      setResult(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Escáner IA de Estampillas</h1>
      <p className={styles.subtitle}>
        Sube una foto de tu sello y nuestra IA filatélica lo identificará por ti.
      </p>

      <div className={styles.uploadBox}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={styles.fileInput}
          id="scanner-upload"
        />
        <label htmlFor="scanner-upload" className={styles.uploadLabel}>
          {image ? 'Cambiar Imagen' : 'Seleccionar Imagen o Usar Cámara'}
        </label>
      </div>

      {image && (
        <div className={styles.previewContainer}>
          <img src={image} alt="Preview" className={styles.preview} />
          <button
            onClick={handleScan}
            disabled={loading}
            className="btn btn--primary"
          >
            {loading ? 'Identificando...' : 'Escanear Sello'}
          </button>
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}

      {result && (
        <div className={styles.resultCard}>
          <h2>Resultado de la Identificación</h2>
          <div className={styles.resultGrid}>
            <div className={styles.resultItem}>
              <strong>País:</strong> {result.pais_origen}
            </div>
            <div className={styles.resultItem}>
              <strong>Año:</strong> {result.ano_estimado}
            </div>
            <div className={styles.resultItem}>
              <strong>Valor Facial:</strong> {result.valor_facial} {result.moneda}
            </div>
            <div className={styles.resultItem}>
              <strong>Motivo:</strong> {result.motivo_principal}
            </div>
            <div className={styles.resultItem}>
              <strong>Catálogo:</strong> {result.catalogo_estimado}
            </div>
          </div>
          {result.notas_condicion && (
            <div className={styles.notes}>
              <strong>Notas:</strong> {result.notas_condicion}
            </div>
          )}
          <button className="btn btn--outline" style={{ marginTop: '1rem' }}>
            Buscar en Catálogo Oficial
          </button>
        </div>
      )}
    </div>
  )
}
