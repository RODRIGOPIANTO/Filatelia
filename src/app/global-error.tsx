'use client'
import Link from 'next/link'
import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[GlobalError]', error)
  }, [error])

  return (
    <html lang="es">
      <body style={{
        margin: 0,
        background: '#0d1a0d',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: '"Inter", sans-serif',
        color: '#e8eae8',
        gap: '1.5rem',
        textAlign: 'center',
        padding: '2rem',
      }}>
        <span style={{ fontSize: '4rem' }}>💣</span>
        <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2.5rem', fontWeight: 600, margin: 0 }}>
          Error inesperado
        </h1>
        <p style={{ color: '#8a9e8a', lineHeight: 1.6, maxWidth: 480, margin: 0 }}>
          Algo salió mal. Por favor recarga la página o vuelve al inicio.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={reset}
            style={{ padding: '0.75rem 1.5rem', background: '#2d4a2d', color: '#e8eae8', border: '1px solid #3b6b3b', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' }}
          >
            🔄 Reintentar
          </button>
          <Link href="/" style={{ padding: '0.75rem 1.5rem', border: '1px solid #c8a96e', borderRadius: '6px', color: '#c8a96e', textDecoration: 'none', fontSize: '0.9rem' }}>
            Ir al inicio
          </Link>
        </div>
      </body>
    </html>
  )
}
