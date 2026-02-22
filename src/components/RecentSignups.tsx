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

export function RecentSignups({ data }: { data: { id: string; name: string; date: string; plan: string }[] }) {
  return (
    <div style={cardStyle}>
      <h3 style={{ margin: '0 0 0.35rem', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
        RECENT SIGNUPS
      </h3>
      <p style={{ margin: '0 0 1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Latest registered users.</p>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {data.slice(0, 8).map((u) => (
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
