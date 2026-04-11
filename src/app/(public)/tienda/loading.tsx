export default function TiendaLoading() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-dark)', padding: '4rem 0' }}>
      <div className="container">
        {/* Header skeleton */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={pulse({ width: 280, height: 48, marginBottom: '0.75rem' })} />
          <div style={pulse({ width: 360, height: 18 })} />
        </div>
        {/* Filter bar skeleton */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2.5rem' }}>
          {[80, 95, 75, 90].map((w, i) => (
            <div key={i} style={pulse({ width: w, height: 36, borderRadius: 6 })} />
          ))}
        </div>
        {/* Product grid skeleton */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={pulse({ height: 320, borderRadius: 16 })} />
          ))}
        </div>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
    </div>
  )
}

function pulse(style: React.CSSProperties): React.CSSProperties {
  return {
    ...style,
    background: 'var(--color-bg-elevated)',
    animation: 'pulse 1.8s ease-in-out infinite',
  }
}
