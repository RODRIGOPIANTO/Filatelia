'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import styles from './Navbar.module.css'

const navLinks = [
  { href: '/catalogos', label: 'Catálogos' },
  { href: '/escaner', label: 'Escáner IA' },
  { href: '/mi-album', label: 'Mi Álbum' },
  { href: '/mercado', label: 'Mercado' },
  { href: '/foro', label: 'Foro' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const { totalItems, toggleCart } = useCart()

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

          <Link href="/auth/login" className="btn btn--outline btn--sm">
            Entrar
          </Link>
          <Link href="/auth/register" className="btn btn--primary btn--sm">
            Regístrese
          </Link>
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
