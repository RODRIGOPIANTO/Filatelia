import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <span className={styles.brandStamp}>✦</span>
          <span className={styles.brandName}>Filatelia Peruana</span>
        </div>
        <nav className={styles.nav} aria-label="Footer">
          <Link href="/catalogos" className={styles.navLink}>Catálogos</Link>
          <Link href="/tienda" className={styles.navLink}>Tienda</Link>
          <Link href="/auth/login" className={styles.navLink}>Ingresar</Link>
        </nav>
        <p className={styles.copy}>
          &copy;{new Date().getFullYear()} Filatelia Peruana. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
