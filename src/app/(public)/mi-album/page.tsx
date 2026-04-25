import { useEffect, useState } from 'react'
import styles from './page.module.css'

export default function MyAlbumPage() {
  const [inventory, setInventory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'explorer' | 'legacy'>('explorer')

  useEffect(() => {
    fetch('/api/user/inventory')
      .then(res => res.json())
      .then(data => {
        setInventory(data.data || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className={`${styles.container} ${viewMode === 'legacy' ? styles.legacy : ''}`}>
      <header className={styles.header}>
        <h1>Mi Álbum Personal</h1>
        <div className={styles.controls}>
          <button 
            onClick={() => setViewMode('explorer')} 
            className={`btn ${viewMode === 'explorer' ? 'btn--primary' : 'btn--outline'}`}
          >
            Modo Explorer
          </button>
          <button 
            onClick={() => setViewMode('legacy')} 
            className={`btn ${viewMode === 'legacy' ? 'btn--primary' : 'btn--outline'}`}
          >
            Modo Legacy (60+)
          </button>
        </div>
      </header>

      <section className={styles.stats}>
        <div className={styles.statCard}>
          <h3>Total Estampillas</h3>
          <p>124</p>
        </div>
        <div className={styles.statCard}>
          <h3>Valor Estimado</h3>
          <p>$153,500.00</p>
        </div>
        <div className={styles.statCard}>
          <h3>Países</h3>
          <p>12</p>
        </div>
      </section>

      <section className={styles.inventory}>
        <h2>Mi Inventario</h2>
        {loading ? <p>Cargando...</p> : (
          <div className={styles.grid}>
            {inventory.map(item => (
              <div key={item.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className="badge badge--active">{item.stamp?.face_value}</span>
                  <span>{item.stamp?.group?.year}</span>
                </div>
                <h3>{item.stamp?.group?.title_es}</h3>
                <p>Condición: <strong>{item.condition || 'Desconocida'}</strong></p>
                <p className={styles.price}>Valor: ${item.stamp?.base_value || '0.00'}</p>
              </div>
            ))}
            {inventory.length === 0 && <p>Tu álbum está vacío. ¡Empieza a coleccionar!</p>}
          </div>
        )}
      </section>

      <section className={styles.wishlist}>
        <h2>Lista de Deseos / Faltantes</h2>
        <p>No tienes estampillas en tu lista de deseos aún.</p>
      </section>
    </div>
  )
}
