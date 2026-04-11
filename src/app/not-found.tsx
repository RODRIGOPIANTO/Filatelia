import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '60vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: '1.5rem',
      backgroundColor: 'var(--color-bg-dark)', color: 'var(--color-text-light)',
      fontFamily: 'var(--font-body)', textAlign: 'center', padding: '2rem',
    }}>
      <span style={{ fontSize: '4rem', color: 'var(--color-accent)' }}>✦</span>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 600, letterSpacing: '-0.02em' }}>
        Página no encontrada
      </h1>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '400px', lineHeight: 1.6 }}>
        El catálogo o la página que busca no existe o aún no está disponible.
      </p>
      <Link href="/" className="btn btn--primary" id="not-found-home">
        Volver al Inicio
      </Link>
    </div>
  )
}
