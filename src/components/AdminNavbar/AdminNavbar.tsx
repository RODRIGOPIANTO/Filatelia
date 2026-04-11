'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from '@/styles/admin.module.css'

const adminLinks = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/catalogos', label: 'Catálogos' },
  { href: '/admin/grupos', label: 'Grupos' },
  { href: '/admin/estampillas', label: 'Estampillas' },
  { href: '/admin/importar', label: 'Importar Excel' },
  { href: '/admin/modificaciones', label: 'Modificaciones' },
  { href: '/admin/analitica', label: 'Analítica' },
]

export default function AdminNavbar() {
  const pathname = usePathname()
  return (
    <nav className={styles.adminNavbar} role="navigation" aria-label="Navegación admin">
      <Link href="/admin/dashboard" className={styles.adminNavBrand}>
        <span className={styles.adminNavBrandIcon}>✦</span>
        Admin Panel
      </Link>
      <ul className={styles.adminNavLinks}>
        {adminLinks.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className={`${styles.adminNavLink} ${pathname.startsWith(l.href) ? styles['adminNavLink--active'] : ''}`}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <Link href="/" className="btn btn--outline btn--sm" target="_blank" rel="noopener noreferrer">
          Ver sitio ↗
        </Link>
      </div>
    </nav>
  )
}
