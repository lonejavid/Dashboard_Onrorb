export function FreeTrialBar({ data }: { data: { label: string; count: number; percent: number }[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="dashboard-cc">
      <div className="ct"><h3>Free Trial</h3></div>
      <div className="cs">Trial claim rate (conversion signal).</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {data.map((d) => (
          <div key={d.label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: '0.9rem', color: 'var(--text-md)' }}>
              <span>{d.label}</span>
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
                  background: d.label === 'Claimed' ? 'var(--green)' : 'var(--orange)',
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
