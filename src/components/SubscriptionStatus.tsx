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
            background: noCard ? 'var(--mint)' : 'var(--mint)',
            borderRadius: 8,
            padding: '0.75rem 1rem',
            minWidth: 100,
            border: '1px solid var(--border-lt)',
          }}
        >
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>{d.count}</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{d.status}</div>
        </div>
      ))}
    </div>
  );

  if (noCard) return content;

  return (
    <div className="dashboard-cc">
      <div className="ct"><h3>Subscription Status</h3></div>
      <div className="cs">Stripe subscription states.</div>
      {content}
    </div>
  );
}
