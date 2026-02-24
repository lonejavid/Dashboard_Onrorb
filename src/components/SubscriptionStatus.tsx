const cardStyle: React.CSSProperties = {
  background: 'var(--bg-card)',
  borderRadius: 12,
  padding: '1.25rem',
  border: '1px solid var(--border)',
  boxShadow: 'var(--shadow-card)',
};

export function SubscriptionStatus({
  data,
  noCard,
}: {
  data: { status: string; count: number }[];
  noCard?: boolean;
}) {
  const content = (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
      {data.map((d) => (
        <div
          key={d.status}
          style={{
            background: noCard ? 'rgba(255,255,255,0.03)' : 'var(--bg-primary)',
            borderRadius: 8,
            padding: '0.75rem 1rem',
            minWidth: 100,
            border: noCard ? '1px solid rgba(255,255,255,0.06)' : undefined,
          }}
        >
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: noCard ? '#e2e8f0' : undefined }}>{d.count}</div>
          <div style={{ fontSize: '0.85rem', color: noCard ? '#94a3b8' : 'var(--text-secondary)', textTransform: 'capitalize' }}>{d.status}</div>
        </div>
      ))}
    </div>
  );

  if (noCard) return content;

  return (
    <div style={cardStyle}>
      <h3 style={{ margin: '0 0 0.35rem', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
        SUBSCRIPTION STATUS
      </h3>
      <p style={{ margin: '0 0 1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Stripe subscription states.</p>
      {content}
    </div>
  );
}
