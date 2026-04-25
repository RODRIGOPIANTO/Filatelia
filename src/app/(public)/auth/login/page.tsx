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

  const handleGoogleLogin = async () => {
    const { supabase } = await import('@/lib/supabase/client')
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const { supabase } = await import('@/lib/supabase/client')
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/')
      router.refresh()
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

        <button 
          onClick={handleGoogleLogin} 
          className={`btn btn--outline ${styles.googleBtn}`}
          style={{ width: '100%', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" style={{ width: '18px' }} />
          Continuar con Google
        </button>

        <div style={{ textAlign: 'center', margin: '1rem 0', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
          O CON EMAIL
        </div>

        <form className={styles.form} id="login-form" onSubmit={handleSubmit}>
          {error && <div className={styles.errorBanner}>{error}</div>}
          
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="su@email.com"
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
