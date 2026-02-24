function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return iso;
  }
}

export function RecentSignups({
  data,
  limit = 8,
  title = 'RECENT SIGNUPS',
  subtitle = 'Latest registered users.',
}: {
  data: { id: string; name: string; date: string; plan: string }[];
  limit?: number;
  title?: string;
  subtitle?: string;
}) {
  const list = data.slice(0, limit);
  return (
    <div className="dashboard-cc">
      <div className="ct"><h3>{title}</h3></div>
      <div className="cs">{subtitle}</div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {list.map((u) => (
          <li
            key={u.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 0',
              borderBottom: '1px solid var(--border-lt)',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-md)', fontSize: 13 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: u.plan === 'pro' ? 'var(--orange)' : 'var(--green)',
                }}
              />
              {u.name}
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{formatDate(u.date)}</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'capitalize', color: 'var(--text)' }}>{u.plan}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
