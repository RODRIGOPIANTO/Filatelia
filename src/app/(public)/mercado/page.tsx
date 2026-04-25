'use client'
import styles from './page.module.css'

const LISTINGS = [
  { id: '1', title: 'Colección Aves 2021', seller: 'User123', price: 45.00, condition: 'MNH', image: '/images/stamps-collage.jpg' },
  { id: '2', title: 'Bicentenario Perú Sello Raro', seller: 'PhilatelistPE', price: 120.00, condition: 'MH', image: '/images/stamps-collage.jpg' },
  { id: '3', title: 'Lote 50 sellos Alemania', seller: 'GlobalCollector', price: 15.00, condition: 'USED', image: '/images/stamps-collage.jpg' },
]

export default function MercadoPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Mercado Filatélico</h1>
        <p>Compra y vende estampillas con total seguridad mediante nuestro sistema de Escrow.</p>
      </header>

      <div className={styles.searchBar}>
        <input type="text" placeholder="Buscar por país, año o temática..." />
        <button className="btn btn--primary">Buscar</button>
      </div>

      <section className={styles.listings}>
        <div className={styles.grid}>
          {LISTINGS.map(item => (
            <div key={item.id} className={styles.card}>
              <div className={styles.imageBox}>
                <img src={item.image} alt={item.title} />
              </div>
              <div className={styles.content}>
                <h3>{item.title}</h3>
                <p className={styles.seller}>Vendedor: {item.seller}</p>
                <div className={styles.meta}>
                  <span className="badge badge--active">{item.condition}</span>
                  <span className={styles.price}>${item.price.toFixed(2)}</span>
                </div>
                <button className="btn btn--primary" style={{ width: '100%', marginTop: '1rem' }}>
                  Comprar Ahora
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <aside className={styles.info}>
        <div className={styles.infoCard}>
          <h3>Compra Segura (Escrow)</h3>
          <p>Tu dinero está protegido. El vendedor solo recibe el pago cuando confirmas que el sello llegó en las condiciones prometidas.</p>
        </div>
      </aside>
    </div>
  )
}
