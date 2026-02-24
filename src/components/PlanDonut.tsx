import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#0d2818', '#2d7a4f', '#e8610a'];

export function PlanDonut({
  data,
  total,
  noCard,
}: {
  data: { plan: string; count: number; percent: number }[];
  total: number;
  noCard?: boolean;
}) {
  const chartData = data.map((d) => ({ name: d.plan.charAt(0).toUpperCase() + d.plan.slice(1), value: d.count }));

  const chartContent = (
    <div style={{ height: noCard ? 120 : 220, position: 'relative', minWidth: noCard ? 120 : undefined }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={noCard ? 35 : 55}
            outerRadius={noCard ? 50 : 85}
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
          >
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#fff" style={{ fontSize: noCard ? 18 : 24, fontWeight: 700 }}>
            {total}
          </text>
          <Tooltip
            contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, color: '#fff' }}
            labelStyle={{ color: '#fff' }}
            formatter={(value: number, name: string, item: { payload?: { percent?: number } }) =>
              [`${value} (${item?.payload?.percent ?? 0}%)`, name]
            }
          />
          {!noCard && (
            <Legend
              verticalAlign="bottom"
              formatter={(value, entry) => (
                <span style={{ color: '#fff' }}>
                  {value}: {entry.payload?.value} ({data.find((d) => d.plan.toLowerCase() === value.toLowerCase())?.percent ?? 0}%)
                </span>
              )}
            />
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );

  if (noCard) {
    return <div className="donut-svg">{chartContent}</div>;
  }

  return (
    <div className="dashboard-cc">
      <div className="ct"><h3>Plan Distribution</h3></div>
      <div className="cs">Free vs Pro user split.</div>
      {chartContent}
    </div>
  );
}
