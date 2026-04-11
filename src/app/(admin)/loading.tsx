import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin — Filatelia Peruana',
  description: 'Panel de administración',
  robots: { index: false, follow: false },
}

export default function AdminLoading() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-bg-dark)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '1.5rem',
    }}>
      <div style={{
        width: 48, height: 48,
        border: '3px solid rgba(45,74,45,0.3)',
        borderTopColor: 'var(--color-primary)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <p style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)', fontSize: '0.875rem' }}>
        Cargando panel…
      </p>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
