'use client'
import { useState } from 'react'
import styles from './page.module.css'

const MOCK_INVENTORY = [
  { id: '1', name: 'Penny Black', country: 'GB', year: 1840, condition: 'MNH', value: 3000 },
  { id: '2', name: 'Inverted Jenny', country: 'US', year: 1918, condition: 'USED', value: 150000 },
  { id: '3', name: 'Sol de 1857', country: 'PE', year: 1857, condition: 'MH', value: 500 },
]

export default function MyAlbumPage() {
  const [viewMode, setViewMode] = useState<'explorer' | 'legacy'>('explorer')

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
        <div className={styles.grid}>
          {MOCK_INVENTORY.map(item => (
            <div key={item.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className="badge badge--active">{item.country}</span>
                <span>{item.year}</span>
              </div>
              <h3>{item.name}</h3>
              <p>Condición: <strong>{item.condition}</strong></p>
              <p className={styles.price}>Valor: ${item.value.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.wishlist}>
        <h2>Lista de Deseos / Faltantes</h2>
        <p>No tienes estampillas en tu lista de deseos aún.</p>
      </section>
    </div>
  )
}
