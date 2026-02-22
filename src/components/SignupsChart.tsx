import { ComposedChart, Area, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const LINE_COLOR = '#ec4899';
const CHART_BG = '#1a1f2e';
const TOP_BAR_COLOR = '#667eea';
const AXIS_COLOR = 'rgba(255, 255, 255, 0.5)';

const cardStyle: React.CSSProperties = {
  background: 'var(--bg-card)',
  borderRadius: 12,
  padding: '1.25rem',
  border: '1px solid var(--border)',
  boxShadow: 'var(--shadow-card)',
  overflow: 'hidden',
  position: 'relative',
};

function TopBar() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        background: TOP_BAR_COLOR,
        borderRadius: '12px 12px 0 0',
      }}
    />
  );
}

const ChartBarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <line x1="12" y1="20" x2="12" y2="10" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <line x1="6" y1="20" x2="6" y2="16" />
  </svg>
);

function formatMonth(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString('default', { month: 'short' });
  } catch {
    return iso;
  }
}

function formatAxisDate(iso: string): string {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return formatMonth(iso);
    const day = d.getDate();
    const month = d.toLocaleString('default', { month: 'short' });
    return `${month} ${day}`;
  } catch {
    return formatMonth(iso);
  }
}

type SignupsChartProps = {
  data: { month: string; count: number }[];
  summary?: {
    signupsThisMonth: number;
    signupsLastMonth?: number;
    signupGrowthPercent?: number;
  };
};

export function SignupsChart({ data, summary }: SignupsChartProps) {
  const previous = summary?.signupsLastMonth ?? data[data.length - 2]?.count ?? 0;
  const chartData = data.map((r) => ({
    name: formatMonth(r.month),
    nameAxis: formatAxisDate(r.month),
    count: r.count,
    comparison: previous,
  }));

  const current = summary?.signupsThisMonth ?? chartData[chartData.length - 1]?.count ?? 0;
  const growthPercent = summary?.signupGrowthPercent ?? (previous > 0 ? Math.round(((current - previous) / previous) * 100) : null);
  const growthLabel =
    growthPercent != null
      ? growthPercent > 0
        ? `▲${growthPercent}% vs previous period (${previous?.toLocaleString() ?? '—'})`
        : `▼${Math.abs(growthPercent)}% vs previous period (${previous?.toLocaleString() ?? '—'})`
      : null;

  const monthName = new Date().toLocaleString('default', { month: 'short' });
  const year = new Date().getFullYear();
  const yMax = Math.max(10, ...chartData.map((d) => d.count), previous);

  return (
    <div className="dashboard-card" style={cardStyle}>
      <TopBar />
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 4, marginBottom: '0.25rem' }}>
        <span style={{ color: TOP_BAR_COLOR, flexShrink: 0, opacity: 0.95 }} aria-hidden>
          <ChartBarIcon />
        </span>
        <h3
          style={{
            margin: 0,
            fontSize: '0.7rem',
            fontWeight: 600,
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          User signups over time
        </h3>
      </div>
      <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
        Monthly signup volume for trend analysis.
      </p>

      <div style={{ marginTop: '1.25rem', marginBottom: '1rem' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 6 }}>
          {monthName} {year} · last 12 months
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '2.25rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            {current.toLocaleString()}
          </span>
          <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Signups</span>
          {growthLabel != null && (
            <span
              style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: (growthPercent ?? 0) >= 0 ? 'var(--accent-green)' : 'var(--accent-red)',
              }}
            >
              {growthLabel}
            </span>
          )}
        </div>
      </div>

      <div
        style={{
          background: CHART_BG,
          borderRadius: 10,
          padding: '12px 12px 8px 8px',
          marginTop: 8,
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: 12, right: 12, fontSize: '0.75rem', color: AXIS_COLOR, zIndex: 1 }}>
          Comparison period: {previous}
        </div>
        <div style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 32, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="signups-comparison-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(148, 163, 184, 0.35)" />
                  <stop offset="100%" stopColor="rgba(71, 85, 105, 0.2)" />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="nameAxis"
                tick={{ fill: AXIS_COLOR, fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, yMax]}
                tick={{ fill: AXIS_COLOR, fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  padding: '10px 14px',
                  boxShadow: 'var(--shadow-card)',
                  color: 'var(--text-primary)',
                }}
                labelStyle={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: 4 }}
                formatter={(value: number, name: string) => [value, name === 'count' ? 'Signups' : 'Comparison']}
                cursor={{ stroke: LINE_COLOR, strokeWidth: 1, strokeDasharray: '4 4' }}
              />
              <Area
                type="monotone"
                dataKey="comparison"
                fill="url(#signups-comparison-fill)"
                stroke="none"
                isAnimationActive
                animationDuration={1000}
                animationEasing="ease-out"
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke={LINE_COLOR}
                strokeWidth={2}
                dot={{ fill: LINE_COLOR, strokeWidth: 0, r: 3 }}
                activeDot={{ r: 4, stroke: CHART_BG, strokeWidth: 2 }}
                isAnimationActive
                animationDuration={1000}
                animationEasing="ease-out"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
