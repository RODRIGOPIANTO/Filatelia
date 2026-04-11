'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function CatalogoError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[CatalogoError]', error)
  }, [error])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-bg-dark)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.5rem',
      padding: '2rem',
      textAlign: 'center',
      fontFamily: 'var(--font-body)',
    }}>
      <span style={{ fontSize: '3.5rem', lineHeight: 1 }}>📭</span>
      <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-light)', fontSize: '2rem', fontWeight: 600 }}>
        Error al cargar el catálogo
      </h1>
      <p style={{ color: 'var(--color-text-muted)', maxWidth: '480px', lineHeight: 1.6 }}>
        Ocurrió un error inesperado al cargar este catálogo. Puede ser un problema temporal de conexión.
      </p>
      {process.env.NODE_ENV !== 'production' && (
        <code style={{ background: 'rgba(255,50,50,0.1)', border: '1px solid rgba(255,50,50,0.2)', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.75rem', color: '#ff8080', maxWidth: '560px', overflowX: 'auto', textAlign: 'left' }}>
          {error.message}
        </code>
      )}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button className="btn btn--primary" onClick={reset} id="error-retry">
          🔄 Volver a intentar
        </button>
        <Link href="/catalogos" className="btn btn--outline" id="error-back-catalogs">
          Ver todos los catálogos
        </Link>
      </div>
    </div>
  )
}
