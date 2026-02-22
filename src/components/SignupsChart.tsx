import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const cardStyle: React.CSSProperties = {
  background: 'var(--bg-card)',
  borderRadius: 12,
  padding: '1.25rem',
  border: '1px solid var(--border)',
  boxShadow: 'var(--shadow-card)',
};

function formatMonth(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString('default', { month: 'short' });
  } catch {
    return iso;
  }
}

export function SignupsChart({ data }: { data: { month: string; count: number }[] }) {
  const chartData = data.map((r) => ({ name: formatMonth(r.month), count: r.count }));

  return (
    <div style={cardStyle}>
      <h3 style={{ margin: '0 0 0.35rem', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
        USER SIGNUPS OVER TIME
      </h3>
      <p style={{ margin: '0 0 1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Monthly signup volume for trend analysis.</p>
      <div style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <XAxis dataKey="name" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={{ stroke: 'var(--border)' }} />
            <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8 }}
              labelStyle={{ color: 'var(--text-secondary)' }}
              formatter={(value: number) => [value, 'Signups']}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} fill="var(--accent-blue)">
              {chartData.map((_, i) => (
                <Cell key={i} fill="var(--accent-blue)" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
