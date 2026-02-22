const cardStyle: React.CSSProperties = {
  background: 'var(--bg-card)',
  borderRadius: 12,
  padding: '1.35rem 1.25rem',
  border: '1px solid var(--border)',
  boxShadow: 'var(--shadow-card)',
};

const monthName = new Date().toLocaleString('default', { month: 'short' });
const year = new Date().getFullYear();

export function MetricCards({
  summary,
}: {
  summary: {
    totalUsers: number;
    proUsers: number;
    freeUsers: number;
    activeUsers: number;
    signupsThisMonth: number;
    signupGrowthPercent?: number;
    proPercent: number;
    freePercent: number;
    activeRatePercent: number;
  };
}) {
  const growth = summary.signupGrowthPercent ?? 0;
  const growthText = growth > 0 ? `+${growth}% vs last month` : growth < 0 ? `${growth}% vs last month` : 'No prior month data';

  const cards = [
    {
      title: 'Total users',
      value: summary.totalUsers.toLocaleString(),
      sub: 'Cumulative registered accounts',
      trend: null as string | null,
      trendUp: false,
    },
    {
      title: 'Pro users',
      value: summary.proUsers.toLocaleString(),
      sub: `${summary.proPercent}% of total · paid tier`,
      trend: null,
      trendUp: true,
    },
    {
      title: 'Free users',
      value: summary.freeUsers.toLocaleString(),
      sub: `${summary.freePercent}% of total`,
      trend: null,
      trendUp: false,
    },
    {
      title: 'Active users (30d)',
      value: summary.activeUsers.toLocaleString(),
      sub: `${summary.activeRatePercent}% activation rate`,
      trend: null,
      trendUp: true,
    },
    {
      title: 'Signups this month',
      value: summary.signupsThisMonth.toLocaleString(),
      sub: `${monthName} ${year}`,
      trend: growthText,
      trendUp: growth >= 0,
    },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
      {cards.map((c) => (
        <div key={c.title} style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.85rem', fontWeight: 700, letterSpacing: '-0.02em' }}>{c.value}</span>
            {c.trend != null && (
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: c.trendUp ? 'var(--accent-green)' : 'var(--text-muted)',
                  whiteSpace: 'nowrap',
                }}
              >
                {c.trend}
              </span>
            )}
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: 6, fontWeight: 500 }}>
            {c.title}
          </div>
          <div style={{ fontSize: '0.75rem', marginTop: 4, color: 'var(--text-muted)' }}>{c.sub}</div>
        </div>
      ))}
    </div>
  );
}
