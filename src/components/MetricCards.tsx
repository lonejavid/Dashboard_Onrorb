const monthName = new Date().toLocaleString('default', { month: 'short' });
const year = new Date().getFullYear();

export type MetricKey = 'totalUsers' | 'proUsers' | 'freeUsers' | 'activeUsers' | 'signups';

const ICONS = {
  totalUsers: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" />
    </svg>
  ),
  proUsers: (
    <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  freeUsers: (
    <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  activeUsers: (
    <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  signups: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  ),
};

export function MetricCards({
  summary,
  selectedMetric = null,
  onSelectMetric,
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
  selectedMetric?: MetricKey | null;
  onSelectMetric?: (key: MetricKey) => void;
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
    barClass: 'mc-g' | 'mc-o';
    iconClass: 'ig' | 'io' | 'igt' | 'igb';
  }> = [
    { key: 'totalUsers', title: 'Total users', value: summary.totalUsers.toLocaleString(), sub: 'Cumulative registered accounts', trend: null, trendUp: false, barClass: 'mc-g', iconClass: 'ig' },
    { key: 'proUsers', title: 'Pro users', value: summary.proUsers.toLocaleString(), sub: `${summary.proPercent}% of total · paid tier`, trend: null, trendUp: true, barClass: 'mc-o', iconClass: 'io' },
    { key: 'freeUsers', title: 'Free users', value: summary.freeUsers.toLocaleString(), sub: `${summary.freePercent}% of total`, trend: null, trendUp: false, barClass: 'mc-g', iconClass: 'igt' },
    { key: 'activeUsers', title: 'Active users (30d)', value: summary.activeUsers.toLocaleString(), sub: `${summary.activeRatePercent}% activation rate`, trend: null, trendUp: true, barClass: 'mc-g', iconClass: 'igb' },
    { key: 'signups', title: 'Signups this month', value: summary.signupsThisMonth.toLocaleString(), sub: `${monthName} ${year}`, trend: growthText, trendUp: growth >= 0, barClass: 'mc-o', iconClass: 'io' },
  ];

  return (
    <div className="dashboard-m-grid">
      {cards.map((c, i) => {
        const isSelected = selectedMetric === c.key;
        const Wrapper = onSelectMetric ? 'button' : 'div';
        const wrapperProps = onSelectMetric
          ? {
              type: 'button' as const,
              onClick: () => onSelectMetric(c.key),
              style: {
                border: isSelected ? '2px solid var(--green)' : undefined,
                boxShadow: isSelected ? 'var(--sh-grn)' : undefined,
              },
            }
          : {};
        return (
          <Wrapper
            key={c.title}
            className={`dashboard-mc ${c.barClass}`}
            style={{ animationDelay: `${0.05 + i * 0.05}s` }}
            {...wrapperProps}
          >
            {c.trend != null && (
              <div className="dashboard-mc-badge">{c.trend}</div>
            )}
            <div className={`dashboard-mc-icon ${c.iconClass}`} title={c.title}>
              {ICONS[c.key]}
            </div>
            <div className="dashboard-mv">{c.value}</div>
            <div className="dashboard-ml">{c.title}</div>
            <div className="dashboard-ms">{c.sub}</div>
          </Wrapper>
        );
      })}
    </div>
  );
}
