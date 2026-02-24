interface DashboardDataSummary {
  totalUsers: number;
  proUsers: number;
  proPercent: number;
  activeUsers: number;
  activeRatePercent: number;
  signupGrowthPercent?: number;
}

const execPoints = [
  { key: 'total', label: 'Total registered users', sub: 'All-time', valueKey: 'totalUsers', format: (v: number) => v.toLocaleString(), className: '' },
  { key: 'pro', label: 'Paid (Pro) share', sub: (d: DashboardDataSummary) => `${d.proUsers} users`, valueKey: 'proPercent', format: (v: number) => `${v}%`, className: 'o' },
  { key: 'growth', label: 'MoM signup growth', sub: 'vs previous month', valueKey: 'signupGrowthPercent', format: (v: number) => (v != null ? (v > 0 ? `+${v}%` : `${v}%`) : '—'), className: 'g', positive: true },
  { key: 'active', label: '30-day active rate', sub: (d: DashboardDataSummary) => `${d.activeUsers} active users`, valueKey: 'activeRatePercent', format: (v: number) => `${v}%`, className: '' },
];

export function ExecutiveSummary({ data }: { data: DashboardDataSummary }) {
  return (
    <div className="dashboard-exec">
      <div className="dashboard-exec-stripe" />
      <div className="dashboard-exec-lbl">Executive Summary</div>
      <p className="dashboard-exec-desc">
        Key metrics at a glance for investor review. All figures are read-only from live platform data.
      </p>
      <div className="dashboard-exec-row">
        {execPoints.map((p) => {
          const raw = data[p.valueKey as keyof DashboardDataSummary];
          const value = typeof raw === 'number' ? p.format(raw) : (raw != null ? String(raw) : '—');
          const sub = typeof p.sub === 'function' ? p.sub(data) : p.sub;
          return (
            <div key={p.key} className="dashboard-exec-m">
              <div className={`dashboard-exec-v ${p.positive && (data.signupGrowthPercent ?? 0) > 0 ? 'g' : ''} ${p.className}`}>
                {value}
              </div>
              <div className="dashboard-exec-l">{p.label}</div>
              <div className="dashboard-exec-s">{sub}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
