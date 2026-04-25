'use client'
import styles from './page.module.css'

export default function SucesionesPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Sucesiones y Tasaciones</h1>
        <p>Servicio especializado para herederos y gestores de colecciones filatélicas.</p>
      </header>

      <section className={styles.content}>
        <div className={styles.infoCard}>
          <h2>¿Has heredado una colección?</h2>
          <p>Ofrecemos un inventario valorado profesionalmente para procesos sucesorios, seguros o particiones familiares.</p>
          <ul className={styles.list}>
            <li>Inventario detallado pieza por pieza.</li>
            <li>Valoración basada en precios de mercado reales y catálogos internacionales.</li>
            <li>Informe certificado para trámites legales.</li>
            <li>Asesoramiento para la venta en subastas o venta directa.</li>
          </ul>
          <button className="btn btn--primary">Solicitar Tasación Profesional</button>
        </div>

        <div className={styles.process}>
          <h2>Nuestro Proceso</h2>
          <div className={styles.steps}>
            <div className={styles.step}>
              <span>1</span>
              <h3>Contacto Inicial</h3>
              <p>Reunión preliminar para evaluar el volumen de la colección.</p>
            </div>
            <div className={styles.step}>
              <span>2</span>
              <h3>Catalogación</h3>
              <p>Identificación técnica y estado de conservación de cada sello.</p>
            </div>
            <div className={styles.step}>
              <span>3</span>
              <h3>Valoración</h3>
              <p>Estudio de rareza y demanda actual en el mercado global.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
