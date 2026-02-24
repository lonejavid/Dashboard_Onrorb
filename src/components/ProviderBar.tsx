const PROVIDER_COLORS: Record<string, string> = {
  Google: 'var(--orange)',
  'Local / Email': 'var(--green)',
};

export function ProviderBar({ data }: { data: { provider: string; count: number; percent: number }[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="dashboard-cc">
      <div className="ct"><h3>Signup Provider</h3></div>
      <div className="cs">How users registered (OAuth vs email).</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {data.map((d) => (
          <div key={d.provider}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: '0.9rem', color: 'var(--text-md)' }}>
              <span>{d.provider}</span>
              <span style={{ color: 'var(--text-muted)' }}>
                {d.count} ({d.percent}%)
              </span>
            </div>
            <div
              style={{
                height: 24,
                background: 'var(--mint)',
                borderRadius: 6,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${(d.count / max) * 100}%`,
                  height: '100%',
                  background: PROVIDER_COLORS[d.provider] || 'var(--green)',
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
