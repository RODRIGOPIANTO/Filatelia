'use client'
import { useState } from 'react'
import Link from 'next/link'
import { STAMP_THEMES } from '@/types/catalog'
import styles from './page.module.css'

// Demo user — en producción vendrá de NextAuth session
const DEMO_USER = {
  name: 'Rodrigo Sánchez',
  email: 'rodrigo@filateliaperuana.com',
  username: 'rodsan1857',
  joinDate: 'Enero 2024',
  country: 'PE',
  collectingCountries: ['PE', 'IL'],
  collectingThemes: ['flora', 'fauna', 'faros'],
}

const COUNTRY_OPTIONS = [
  { code: 'PE', flag: '🇵🇪', name: 'Perú' },
  { code: 'IL', flag: '🇮🇱', name: 'Israel' },
  { code: 'CL', flag: '🇨🇱', name: 'Chile' },
  { code: 'BR', flag: '🇧🇷', name: 'Brasil' },
  { code: 'AR', flag: '🇦🇷', name: 'Argentina' },
]

const ORDER_HISTORY = [
  { id: 'ORD-0012', date: '07/04/2026', items: 2, total: 103.00, status: 'Enviado' },
  { id: 'ORD-0008', date: '15/03/2026', items: 1, total: 220.00, status: 'Entregado' },
  { id: 'ORD-0003', date: '02/02/2026', items: 3, total: 258.00, status: 'Entregado' },
]

type Tab = 'perfil' | 'preferencias' | 'pedidos'

export default function PerfilPage() {
  const [activeTab, setActiveTab] = useState<Tab>('perfil')
  const [saved, setSaved] = useState(false)
  const [selectedCountries, setSelectedCountries] = useState<string[]>(DEMO_USER.collectingCountries)
  const [selectedThemes, setSelectedThemes] = useState<string[]>(DEMO_USER.collectingThemes)

  function toggleCountry(code: string) {
    setSelectedCountries(prev =>
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    )
  }

  function toggleTheme(slug: string) {
    setSelectedThemes(prev =>
      prev.includes(slug) ? prev.filter(t => t !== slug) : [...prev, slug]
    )
  }

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className="container">
          <div className={styles.profileTop}>
            <div className={styles.avatar}>
              {DEMO_USER.name.charAt(0).toUpperCase()}
            </div>
            <div className={styles.profileInfo}>
              <h1 className={styles.profileName}>{DEMO_USER.name}</h1>
              <p className={styles.profileMeta}>@{DEMO_USER.username} · Coleccionista desde {DEMO_USER.joinDate}</p>
              <div className={styles.profileBadges}>
                {selectedCountries.map(code => {
                  const c = COUNTRY_OPTIONS.find(o => o.code === code)
                  return c ? (
                    <span key={code} className="badge badge--active">{c.flag} {c.name}</span>
                  ) : null
                })}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className={styles.tabs}>
            {([['perfil', 'Mi Perfil'], ['preferencias', 'Colección'], ['pedidos', 'Mis Pedidos']] as [Tab, string][]).map(([key, label]) => (
              <button
                key={key}
                className={`${styles.tab} ${activeTab === key ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(key)}
                id={`tab-${key}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className={styles.content}>
        <div className="container">

          {/* TAB: Perfil */}
          {activeTab === 'perfil' && (
            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>Datos Personales</h2>
              <div className={styles.form}>
                <div className={styles.formGrid2}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Nombre completo</label>
                    <input className={styles.input} defaultValue={DEMO_USER.name} id="profile-name" />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Nombre de usuario</label>
                    <input className={styles.input} defaultValue={DEMO_USER.username} id="profile-username" />
                  </div>
                </div>
                <div className={styles.formGrid2}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Email</label>
                    <input className={styles.input} defaultValue={DEMO_USER.email} type="email" id="profile-email" />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>País</label>
                    <select className={styles.input} defaultValue={DEMO_USER.country}>
                      {COUNTRY_OPTIONS.map(c => <option key={c.code} value={c.code}>{c.flag} {c.name}</option>)}
                    </select>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Nueva contraseña (dejar vacío para no cambiar)</label>
                  <input className={styles.input} type="password" placeholder="••••••••" />
                </div>
                <button
                  className={`btn btn--primary ${saved ? styles.savedBtn : ''}`}
                  onClick={handleSave}
                  id="profile-save"
                >
                  {saved ? '✓ Guardado' : 'Guardar cambios'}
                </button>
              </div>
            </div>
          )}

          {/* TAB: Colección / Preferencias */}
          {activeTab === 'preferencias' && (
            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>Mis Preferencias de Colección</h2>
              <p className={styles.hint}>Personaliza tu experiencia. Estos datos nos ayudan a mostrarte contenido relevante.</p>

              <h3 className={styles.subTitle}>Países que colecciono</h3>
              <div className={styles.checkGrid}>
                {COUNTRY_OPTIONS.map(c => (
                  <label key={c.code} className={`${styles.checkLabel} ${selectedCountries.includes(c.code) ? styles.checkLabelActive : ''}`}>
                    <input
                      type="checkbox"
                      checked={selectedCountries.includes(c.code)}
                      onChange={() => toggleCountry(c.code)}
                      className={styles.checkbox}
                    />
                    {c.flag} {c.name}
                  </label>
                ))}
              </div>

              <h3 className={styles.subTitle} style={{ marginTop: 'var(--sp-8)' }}>Temáticas de interés</h3>
              <div className={styles.checkGrid}>
                {STAMP_THEMES.map(t => (
                  <label key={t.slug} className={`${styles.checkLabel} ${selectedThemes.includes(t.slug) ? styles.checkLabelActive : ''}`}>
                    <input
                      type="checkbox"
                      checked={selectedThemes.includes(t.slug)}
                      onChange={() => toggleTheme(t.slug)}
                      className={styles.checkbox}
                    />
                    {t.nameEs}
                  </label>
                ))}
              </div>

              <button
                className={`btn btn--primary ${saved ? styles.savedBtn : ''}`}
                style={{ marginTop: 'var(--sp-8)' }}
                onClick={handleSave}
                id="prefs-save"
              >
                {saved ? '✓ Preferencias guardadas' : 'Guardar preferencias'}
              </button>
            </div>
          )}

          {/* TAB: Pedidos */}
          {activeTab === 'pedidos' && (
            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>Historial de Pedidos</h2>
              {ORDER_HISTORY.length === 0 ? (
                <div className={styles.emptyOrders}>
                  <p>No has realizado pedidos todavía.</p>
                  <Link href="/tienda" className="btn btn--primary">Ir a la Tienda</Link>
                </div>
              ) : (
                <table className={styles.ordersTable}>
                  <thead>
                    <tr>
                      <th>N° Pedido</th>
                      <th>Fecha</th>
                      <th>Artículos</th>
                      <th>Total</th>
                      <th>Estado</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {ORDER_HISTORY.map(o => (
                      <tr key={o.id}>
                        <td style={{ fontFamily: 'monospace', color: 'var(--color-accent)' }}>{o.id}</td>
                        <td style={{ color: 'var(--color-text-muted)', fontSize: 'var(--fs-sm)' }}>{o.date}</td>
                        <td style={{ textAlign: 'center' }}>{o.items}</td>
                        <td style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--color-accent)' }}>S/. {o.total.toFixed(2)}</td>
                        <td>
                          <span className={`badge ${o.status === 'Entregado' ? 'badge--active' : 'badge--wip'}`}>{o.status}</span>
                        </td>
                        <td>
                          <button className={styles.viewOrderBtn}>Ver detalles</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
