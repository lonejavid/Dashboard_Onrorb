const cardStyle: React.CSSProperties = {
  background: 'var(--bg-card)',
  borderRadius: 12,
  padding: '1.25rem',
  border: '1px solid var(--border)',
  boxShadow: 'var(--shadow-card)',
};

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
    <div style={cardStyle}>
      <h3 style={{ margin: '0 0 0.35rem', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
        {title}
      </h3>
      <p style={{ margin: '0 0 1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{subtitle}</p>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {list.map((u) => (
          <li
            key={u.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.5rem 0',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: u.plan === 'pro' ? 'var(--accent-blue)' : 'var(--accent-green)',
                }}
              />
              {u.name}
            </span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{formatDate(u.date)}</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 500, textTransform: 'capitalize' }}>{u.plan}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
