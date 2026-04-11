import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Catálogos — Filatelia Peruana',
  description: 'Explora nuestra colección de catálogos filatélicos por países y temáticas.',
}

export default function Loading() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-bg-dark)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{
          width: '48px', height: '48px',
          border: '3px solid var(--color-border-dark)',
          borderTopColor: 'var(--color-primary)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
          Cargando catálogos…
        </p>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
