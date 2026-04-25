'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import styles from './Navbar.module.css'

const navLinks = [
  { href: '/catalogos', label: 'Catálogos' },
  { href: '/escaner', label: 'Escáner IA' },
  { href: '/mi-album', label: 'Mi Álbum' },
  { href: '/mercado', label: 'Mercado' },
  { href: '/foro', label: 'Foro' },
  { href: '/sucesiones', label: 'Sucesiones' },
]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const { totalItems, toggleCart } = useCart()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const checkUser = async () => {
      const { supabase } = await import('@/lib/supabase/client')
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    checkUser()
    
    // Listen for auth changes
    const listen = async () => {
      const { supabase } = await import('@/lib/supabase/client')
      supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user || null)
      })
    }
    listen()
  }, [])

  const handleLogout = async () => {
    const { supabase } = await import('@/lib/supabase/client')
    await supabase.auth.signOut()
    setUser(null)
    router.refresh()
  }

  return (
    <nav className={styles.navbar} role="navigation" aria-label="Navegación principal">
      <div className={styles.inner}>
        {/* Brand */}
        <Link href="/" className={styles.brand}>
          <span className={styles.brandStamp}>✦</span>
          <span className={styles.brandText}>Filatelia Peruana</span>
        </Link>

        {/* Desktop links */}
        <ul className={styles.links}>
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`${styles.link} ${pathname.startsWith(l.href) ? styles.linkActive : ''}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth + Cart */}
        <div className={styles.authButtons}>
          {/* Cart button */}
          <button
            className={styles.cartBtn}
            onClick={toggleCart}
            aria-label={`Abrir carrito, ${totalItems} artículo${totalItems !== 1 ? 's' : ''}`}
            id="navbar-cart-btn"
          >
            🛒
            {totalItems > 0 && (
              <span className={styles.cartBadge} aria-hidden="true">{totalItems}</span>
            )}
          </button>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{user.email}</span>
              <button onClick={handleLogout} className="btn btn--outline btn--sm">Salir</button>
            </div>
          ) : (
            <>
              <Link href="/auth/login" className="btn btn--outline btn--sm">
                Entrar
              </Link>
              <Link href="/auth/register" className="btn btn--primary btn--sm">
                Regístrese
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className={styles.mobileAuth}>
            <button className={styles.cartBtn} onClick={() => { toggleCart(); setMenuOpen(false) }}>
              🛒 Carrito {totalItems > 0 && `(${totalItems})`}
            </button>
            <Link href="/auth/login" className="btn btn--outline btn--sm" onClick={() => setMenuOpen(false)}>Entrar</Link>
            <Link href="/auth/register" className="btn btn--primary btn--sm" onClick={() => setMenuOpen(false)}>Regístrese</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
