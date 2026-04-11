import type { Metadata } from 'next'
import Link from 'next/link'
import styles from '../auth.module.css'
import { STAMP_THEMES } from '@/types/catalog'

export const metadata: Metadata = {
  title: 'Crear Cuenta — Filatelia Peruana',
  description: 'Regístrese como coleccionista en Filatelia Peruana y acceda a catálogos exclusivos.',
}

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
  return (
    <div className={styles.page}>
      <div className={`${styles.card} ${styles.cardWide}`}>
        <div className={styles.cardHeader}>
          <span className={styles.brandIcon}>✦</span>
          <h1 className={styles.cardTitle}>Crear Cuenta</h1>
          <p className={styles.cardSubtitle}>Únase a la comunidad de coleccionistas del Perú</p>
        </div>

        <form className={styles.form} id="register-form" action="#" method="POST" noValidate>
          {/* ─── Datos básicos ─── */}
          <h2 className={styles.sectionTitle}>Datos personales</h2>
          <div className={styles.grid2}>
            <div className={styles.formGroup}>
              <label htmlFor="fullName" className={styles.label}>Nombre completo</label>
              <input id="fullName" name="fullName" type="text" autoComplete="name"
                placeholder="Juan Pérez" className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="username" className={styles.label}>Nombre de usuario</label>
              <input id="username" name="username" type="text" autoComplete="username"
                placeholder="juancoleccionista" className={styles.input} />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email <span className={styles.required}>*</span></label>
            <input id="email" name="email" type="email" autoComplete="email" required
              placeholder="correo@ejemplo.com" className={styles.input} />
          </div>

          <div className={styles.grid2}>
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>Contraseña <span className={styles.required}>*</span></label>
              <input id="password" name="password" type="password" autoComplete="new-password" required
                placeholder="Mínimo 8 caracteres" className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>Confirmar contraseña <span className={styles.required}>*</span></label>
              <input id="confirmPassword" name="confirmPassword" type="password"
                autoComplete="new-password" required placeholder="Repita la contraseña" className={styles.input} />
            </div>
          </div>

          <div className={styles.grid2}>
            <div className={styles.formGroup}>
              <label htmlFor="birthDate" className={styles.label}>Fecha de nacimiento</label>
              <input id="birthDate" name="birthDate" type="date" className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="countryCode" className={styles.label}>País donde vive</label>
              <select id="countryCode" name="countryCode" className={styles.input}>
                <option value="">Seleccione un país</option>
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* ─── Preferencias de colección ─── */}
          <h2 className={styles.sectionTitle} style={{ marginTop: 'var(--sp-6)' }}>
            ¿Qué colecciona?
          </h2>
          <p className={styles.hint}>Seleccione hasta 5 países y 5 temáticas de su interés (opcional)</p>

          <div className={styles.formGroup}>
            <label className={styles.label}>Países de interés</label>
            <div className={styles.checkGrid}>
              {CATALOG_COUNTRIES.map((c) => (
                <label key={c.code} className={styles.checkLabel}>
                  <input type="checkbox" name="collectingCountries" value={c.code} className={styles.checkbox} />
                  {c.name}
                </label>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Temáticas de interés</label>
            <div className={styles.checkGrid}>
              {STAMP_THEMES.slice(0, 10).map((t) => (
                <label key={t.slug} className={styles.checkLabel}>
                  <input type="checkbox" name="collectingThemes" value={t.slug} className={styles.checkbox} />
                  {t.nameEs}
                </label>
              ))}
            </div>
          </div>

          <button type="submit" id="register-submit"
            className={`btn btn--primary ${styles.submitBtn}`}>
            Crear Mi Cuenta
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
