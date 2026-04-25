'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from '../auth.module.css'
import { STAMP_THEMES } from '@/types/catalog'

const COUNTRIES = [
  { code: 'PE', name: 'Perú' }, { code: 'AR', name: 'Argentina' }, { code: 'CL', name: 'Chile' },
  { code: 'BR', name: 'Brasil' }, { code: 'MX', name: 'México' }, { code: 'CO', name: 'Colombia' },
  { code: 'US', name: 'Estados Unidos' }, { code: 'ES', name: 'España' }, { code: 'IL', name: 'Israel' },
  { code: 'DE', name: 'Alemania' }, { code: 'FR', name: 'Francia' }, { code: 'GB', name: 'Reino Unido' },
]

const CATALOG_COUNTRIES = [
  { code: 'PE', name: '🇵🇪 Perú' }, { code: 'IL', name: '🇮🇱 Israel' },
  { code: 'CL', name: '🇨🇱 Chile' }, { code: 'BR', name: '🇧🇷 Brasil' },
  { code: 'AR', name: '🇦🇷 Argentina' },
]

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    username: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      setLoading(false)
      return
    }

    const { supabase } = await import('@/lib/supabase/client')
    const { error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName,
          username: formData.username,
        }
      }
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
    } else {
      alert('Registro exitoso. Por favor revisa tu correo para confirmar tu cuenta.')
      router.push('/auth/login')
    }
  }

  return (
    <div className={styles.page}>
      <div className={`${styles.card} ${styles.cardWide}`}>
        <div className={styles.cardHeader}>
          <span className={styles.brandIcon}>✦</span>
          <h1 className={styles.cardTitle}>Crear Cuenta</h1>
          <p className={styles.cardSubtitle}>Únase a la comunidad de coleccionistas del Perú</p>
        </div>

        <form className={styles.form} id="register-form" onSubmit={handleSubmit}>
          {error && <div className={styles.errorBanner}>{error}</div>}

          {/* ─── Datos básicos ─── */}
          <h2 className={styles.sectionTitle}>Datos personales</h2>
          <div className={styles.grid2}>
            <div className={styles.formGroup}>
              <label htmlFor="fullName" className={styles.label}>Nombre completo</label>
              <input id="fullName" name="fullName" type="text" 
                value={formData.fullName} onChange={handleChange}
                placeholder="Juan Pérez" className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="username" className={styles.label}>Nombre de usuario</label>
              <input id="username" name="username" type="text"
                value={formData.username} onChange={handleChange}
                placeholder="juancoleccionista" className={styles.input} />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email <span className={styles.required}>*</span></label>
            <input id="email" name="email" type="email" required
              value={formData.email} onChange={handleChange}
              placeholder="correo@ejemplo.com" className={styles.input} />
          </div>

          <div className={styles.grid2}>
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>Contraseña <span className={styles.required}>*</span></label>
              <input id="password" name="password" type="password" required
                value={formData.password} onChange={handleChange}
                placeholder="Mínimo 8 caracteres" className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>Confirmar contraseña <span className={styles.required}>*</span></label>
              <input id="confirmPassword" name="confirmPassword" type="password"
                value={formData.confirmPassword} onChange={handleChange}
                required placeholder="Repita la contraseña" className={styles.input} />
            </div>
          </div>

          <button type="submit" id="register-submit" disabled={loading}
            className={`btn btn--primary ${styles.submitBtn}`}>
            {loading ? 'Procesando...' : 'Crear Mi Cuenta'}
          </button>
        </form>

        <p className={styles.switchLink}>
          ¿Ya tiene cuenta?{' '}
          <Link href="/auth/login">Ingresar aquí</Link>
        </p>
      </div>
    </div>
  )
}
