const cardStyle: React.CSSProperties = {
  background: 'var(--bg-card)',
  borderRadius: 12,
  padding: '1.25rem',
  border: '1px solid var(--border)',
  boxShadow: 'var(--shadow-card)',
};

interface PlatformStatsData {
  totalScans: number;
  scansLast30Days?: number;
  avgScansPerUser?: number;
  spamDomainsBlocked: number;
  trustedDomains: number;
}

export function PlatformStats({ data }: { data: PlatformStatsData }) {
  return (
    <div style={cardStyle}>
      <h3 style={{ margin: '0 0 0.5rem', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
        PLATFORM INTELLIGENCE
      </h3>
      <p style={{ margin: '0 0 1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
        Security & scale metrics from the protection layer.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Total scans (all time)</span>
          <span style={{ fontWeight: 700, fontSize: '1rem' }}>{data.totalScans.toLocaleString()}</span>
        </div>
        {data.scansLast30Days != null && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Scans (last 30 days)</span>
            <span style={{ fontWeight: 600, color: 'var(--accent-blue)' }}>{data.scansLast30Days.toLocaleString()}</span>
          </div>
        )}
        {data.avgScansPerUser != null && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Avg scans per user</span>
            <span style={{ fontWeight: 600 }}>{data.avgScansPerUser}</span>
          </div>
        )}
        <div style={{ height: 1, background: 'var(--border)', margin: '0.25rem 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Spam domains blocked</span>
          <span style={{ fontWeight: 600, color: 'var(--accent-red)' }}>{data.spamDomainsBlocked.toLocaleString()}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Trusted domains</span>
          <span style={{ fontWeight: 600, color: 'var(--accent-green)' }}>{data.trustedDomains.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
