const monthName = new Date().toLocaleString('default', { month: 'short' });
const year = new Date().getFullYear();

const baseCardStyle: React.CSSProperties = {
  background: 'var(--bg-card)',
  borderRadius: 12,
  padding: '1.35rem 1.25rem',
  border: '1px solid var(--border)',
  boxShadow: 'var(--shadow-card)',
  overflow: 'hidden',
  position: 'relative',
};

function TopBar({ color }: { color: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        background: color,
        borderRadius: '12px 12px 0 0',
      }}
    />
  );
}

const ICONS = {
  totalUsers: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  proUsers: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  freeUsers: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  activeUsers: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  signups: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  ),
};

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

  const cards: Array<{
    key: keyof typeof ICONS;
    title: string;
    value: string;
    sub: string;
    trend: string | null;
    trendUp: boolean;
    topBarColor: string;
    iconColor: string;
  }> = [
    {
      key: 'totalUsers',
      title: 'Total users',
      value: summary.totalUsers.toLocaleString(),
      sub: 'Cumulative registered accounts',
      trend: null,
      trendUp: false,
      topBarColor: 'var(--accent-blue)',
      iconColor: 'var(--accent-blue)',
    },
    {
      key: 'proUsers',
      title: 'Pro users',
      value: summary.proUsers.toLocaleString(),
      sub: `${summary.proPercent}% of total · paid tier`,
      trend: null,
      trendUp: true,
      topBarColor: 'var(--accent-amber)',
      iconColor: 'var(--accent-amber)',
    },
    {
      key: 'freeUsers',
      title: 'Free users',
      value: summary.freeUsers.toLocaleString(),
      sub: `${summary.freePercent}% of total`,
      trend: null,
      trendUp: false,
      topBarColor: 'var(--text-muted)',
      iconColor: 'var(--text-secondary)',
    },
    {
      key: 'activeUsers',
      title: 'Active users (30d)',
      value: summary.activeUsers.toLocaleString(),
      sub: `${summary.activeRatePercent}% activation rate`,
      trend: null,
      trendUp: true,
      topBarColor: 'var(--accent-green)',
      iconColor: 'var(--accent-green)',
    },
    {
      key: 'signups',
      title: 'Signups this month',
      value: summary.signupsThisMonth.toLocaleString(),
      sub: `${monthName} ${year}`,
      trend: growthText,
      trendUp: growth >= 0,
      topBarColor: 'var(--accent-cyan)',
      iconColor: growth >= 0 ? 'var(--accent-green)' : 'var(--accent-red)',
    },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
      {cards.map((c) => (
        <div key={c.title} className="dashboard-card" style={baseCardStyle}>
          <TopBar color={c.topBarColor} />
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginTop: 6 }}>
            <span style={{ color: c.iconColor, flexShrink: 0, opacity: 0.95 }} title={c.title}>
              {ICONS[c.key]}
            </span>
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
          <span style={{ display: 'block', fontSize: '1.85rem', fontWeight: 700, letterSpacing: '-0.02em', marginTop: 4 }}>{c.value}</span>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: 6, fontWeight: 500 }}>{c.title}</div>
          <div style={{ fontSize: '0.75rem', marginTop: 4, color: 'var(--text-muted)' }}>{c.sub}</div>
        </div>
      ))}
    </div>
  );
}
