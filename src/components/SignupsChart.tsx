import { ComposedChart, Area, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const LINE_COLOR = '#2d7a4f';
const AXIS_COLOR = '#6a8a74';

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
    <div className="dashboard-cc">
      <div className="ct">
        <h3>User Signups Over Time</h3>
        <span className="cp">{monthName} {year} · last 12 months</span>
      </div>
      <div className="cs">Monthly signup volume for trend analysis.</div>
      <div style={{ marginBottom: 16 }}>
        <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>
          {current.toLocaleString()}
        </span>
        {growthLabel != null && (
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: (growthPercent ?? 0) >= 0 ? 'var(--green)' : 'var(--orange)', marginLeft: 10 }}>
            {growthLabel}
          </span>
        )}
      </div>
      <div style={{ background: 'var(--mint)', borderRadius: 10, padding: '12px 12px 8px 8px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 12, right: 12, fontSize: '0.75rem', color: AXIS_COLOR, zIndex: 1 }}>
          Comparison: {previous}
        </div>
        <div style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 32, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="signups-comparison-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(45, 122, 79, 0.18)" />
                  <stop offset="100%" stopColor="rgba(45, 122, 79, 0.02)" />
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
                  background: 'var(--white)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  padding: '10px 14px',
                  boxShadow: 'var(--sh)',
                  color: 'var(--text)',
                }}
                labelStyle={{ color: 'var(--text)', fontWeight: 600, marginBottom: 4 }}
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
                activeDot={{ r: 4, stroke: 'var(--mint)', strokeWidth: 2 }}
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
