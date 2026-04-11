import type { Metadata } from 'next'
import Link from 'next/link'
import styles from '../auth.module.css'

export const metadata: Metadata = {
  title: 'Iniciar Sesión — Filatelia Peruana',
  description: 'Ingrese a su cuenta de Filatelia Peruana para acceder a sus colecciones.',
}

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.brandIcon}>✦</span>
          <h1 className={styles.cardTitle}>Filatelia Peruana</h1>
          <p className={styles.cardSubtitle}>Ingrese a su cuenta de coleccionista</p>
        </div>

        {/* Form — action vacío: en producción, llamar a NextAuth signIn */}
        <form className={styles.form} id="login-form" action="#" method="POST" noValidate>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email o nombre de usuario
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="coleccionista@email.com"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className={styles.input}
            />
          </div>

          <button
            type="submit"
            id="login-submit"
            className={`btn btn--primary ${styles.submitBtn}`}
          >
            Entrar
          </button>
        </form>

        <p className={styles.switchLink}>
          ¿No tiene cuenta?{' '}
          <Link href="/auth/register">Regístrese aquí</Link>
        </p>
      </div>
    </div>
  )
}
