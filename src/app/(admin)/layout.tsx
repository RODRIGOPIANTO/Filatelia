import type { Metadata } from 'next'
import AdminNavbar from '@/components/AdminNavbar/AdminNavbar'
import styles from '@/styles/admin.module.css'

export const metadata: Metadata = {
  title: {
    default: 'Panel Admin — Filatelia Peruana',
    template: '%s | Admin · Filatelia Peruana',
  },
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.adminLayout}>
      <AdminNavbar />
      <main className={styles.adminMain}>
        {children}
      </main>
    </div>
  )
}
