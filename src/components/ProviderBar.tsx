const cardStyle: React.CSSProperties = {
  background: 'var(--bg-card)',
  borderRadius: 12,
  padding: '1.25rem',
  border: '1px solid var(--border)',
  boxShadow: 'var(--shadow-card)',
};

const PROVIDER_COLORS: Record<string, string> = {
  Google: 'var(--accent-amber)',
  'Local / Email': 'var(--accent-blue)',
};

export function ProviderBar({ data }: { data: { provider: string; count: number; percent: number }[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);

  return (
    <div style={cardStyle}>
      <h3 style={{ margin: '0 0 0.35rem', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
        SIGNUP PROVIDER
      </h3>
      <p style={{ margin: '0 0 1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>How users registered (OAuth vs email).</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {data.map((d) => (
          <div key={d.provider}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: '0.9rem' }}>
              <span>{d.provider}</span>
              <span style={{ color: 'var(--text-secondary)' }}>
                {d.count} ({d.percent}%)
              </span>
            </div>
            <div
              style={{
                height: 24,
                background: 'var(--bg-primary)',
                borderRadius: 6,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${(d.count / max) * 100}%`,
                  height: '100%',
                  background: PROVIDER_COLORS[d.provider] || 'var(--accent-blue)',
                  borderRadius: 6,
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
