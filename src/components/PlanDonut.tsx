import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const cardStyle: React.CSSProperties = {
  background: 'var(--bg-card)',
  borderRadius: 12,
  padding: '1.25rem',
  border: '1px solid var(--border)',
  boxShadow: 'var(--shadow-card)',
};

const COLORS = ['var(--accent-blue)', 'var(--accent-purple)', 'var(--accent-cyan)'];

export function PlanDonut({
  data,
  total,
}: {
  data: { plan: string; count: number; percent: number }[];
  total: number;
}) {
  const chartData = data.map((d) => ({ name: d.plan.charAt(0).toUpperCase() + d.plan.slice(1), value: d.count }));

  return (
    <div style={cardStyle}>
      <h3 style={{ margin: '0 0 0.35rem', fontSize: '0.7rem', fontWeight: 600, color: '#fff', letterSpacing: '0.1em' }}>
        PLAN DISTRIBUTION
      </h3>
      <p style={{ margin: '0 0 1rem', fontSize: '0.8rem', color: '#e8e6f0' }}>Free vs Pro user split.</p>
      <div style={{ height: 220, position: 'relative' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
            >
              {chartData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#fff" style={{ fontSize: 24, fontWeight: 700 }}>
              {total}
            </text>
            <Tooltip
              contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, color: '#fff' }}
              labelStyle={{ color: '#fff' }}
              formatter={(value: number, name: string, props: { payload: { percent?: number } }) =>
                [`${value} (${props.payload.percent ?? 0}%)`, name]
              }
            />
            <Legend
              verticalAlign="bottom"
              formatter={(value, entry) => (
                <span style={{ color: '#fff' }}>
                  {value}: {entry.payload?.value} ({data.find((d) => d.plan.toLowerCase() === value.toLowerCase())?.percent ?? 0}%)
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
