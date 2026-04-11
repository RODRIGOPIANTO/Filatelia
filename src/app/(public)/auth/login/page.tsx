'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from '../auth.module.css'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Error al iniciar sesión')
      }

      // En modo demo, guardamos el token en localStorage para permitir acceso visual
      localStorage.setItem('auth_token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      // Redirigir al dashboard
      router.push('/admin/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.brandIcon}>✦</span>
          <h1 className={styles.cardTitle}>Filatelia Peruana</h1>
          <p className={styles.cardSubtitle}>Ingrese a su cuenta de coleccionista</p>
        </div>

        <form className={styles.form} id="login-form" onSubmit={handleSubmit}>
          {error && <div className={styles.errorBanner}>{error}</div>}
          
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email o nombre de usuario
            </label>
            <input
              id="email"
              name="email"
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@test.com"
              className={styles.input}
              disabled={loading}
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
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={styles.input}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            id="login-submit"
            className={`btn btn--primary ${styles.submitBtn}`}
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Entrar'}
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
