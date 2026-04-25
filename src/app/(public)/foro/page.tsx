'use client'
import styles from './page.module.css'

const CATEGORIES = [
  { id: '1', name: 'Estudio de Prefilatelia', threads: 45, posts: 230 },
  { id: '2', name: 'Tasaciones y Autenticidad', threads: 120, posts: 890 },
  { id: '3', name: 'Intercambios y Trueques', threads: 210, posts: 1540 },
  { id: '4', name: 'Estampillas Modernas (2000+)', threads: 34, posts: 112 },
]

export default function ForoPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Comunidad Filatélica</h1>
        <p>El punto de encuentro para el estudio, debate e intercambio de conocimientos.</p>
      </header>

      <div className={styles.categoryList}>
        {CATEGORIES.map(cat => (
          <div key={cat.id} className={styles.categoryRow}>
            <div className={styles.catInfo}>
              <h3>{cat.name}</h3>
              <p>Hilos sobre investigación técnica y hallazgos.</p>
            </div>
            <div className={styles.catStats}>
              <span><strong>{cat.threads}</strong> hilos</span>
              <span><strong>{cat.posts}</strong> mensajes</span>
            </div>
            <div className={styles.catAction}>
              <button className="btn btn--outline btn--sm">Entrar</button>
            </div>
          </div>
        ))}
      </div>

      <section className={styles.recent}>
        <h2>Hilos Recientes</h2>
        <div className={styles.topic}>
          <p>¿Alguien puede ayudarme a identificar este matasellos de 1860?</p>
          <span>Iniciado por <strong>Marcos88</strong> en Tasaciones</span>
        </div>
        <div className={styles.topic}>
          <p>Nueva emisión del Bicentenario: Opiniones sobre el dentado.</p>
          <span>Iniciado por <strong>ExpertPhil</strong> en Estampillas Modernas</span>
        </div>
      </section>
    </div>
  )
}
