const cardStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, var(--bg-card) 0%, rgba(99, 102, 241, 0.06) 100%)',
  borderRadius: 16,
  padding: '1.5rem 2rem',
  border: '1px solid var(--border)',
};

export function ExecutiveSummary({ data }: { data: DashboardDataSummary }) {
  const growth = data.signupGrowthPercent ?? 0;
  const growthLabel = growth > 0 ? `+${growth}%` : growth < 0 ? `${growth}%` : '—';
  const points = [
    { label: 'Total registered users', value: data.totalUsers.toLocaleString(), sub: 'All-time' },
    { label: 'Paid (Pro) share', value: `${data.proPercent}%`, sub: `${data.proUsers} users` },
    { label: 'MoM signup growth', value: growthLabel, sub: 'vs previous month', positive: growth > 0 },
    { label: '30-day active rate', value: `${data.activeRatePercent}%`, sub: `${data.activeUsers} active users` },
  ];

  return (
    <div style={cardStyle}>
      <h2 style={{ margin: '0 0 0.5rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-blue)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Executive summary
      </h2>
      <p style={{ margin: '0 0 1.25rem', fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.5, maxWidth: '56ch' }}>
        Key metrics at a glance for investor review. All figures are read-only from live platform data.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
        {points.map((p, i) => (
          <div
            key={p.label}
            style={{
              paddingRight: i < 3 ? '1rem' : 0,
              borderRight: i < 3 ? '1px solid var(--border)' : 'none',
            }}
          >
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: p.positive ? 'var(--accent-green)' : 'var(--text-primary)' }}>
              {p.value}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 2 }}>{p.label}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>{p.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface DashboardDataSummary {
  totalUsers: number;
  proUsers: number;
  proPercent: number;
  activeUsers: number;
  activeRatePercent: number;
  signupGrowthPercent?: number;
}
