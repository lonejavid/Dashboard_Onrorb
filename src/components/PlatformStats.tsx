interface PlatformStatsData {
  totalScans: number;
  scansLast30Days?: number;
  avgScansPerUser?: number;
  spamDomainsBlocked: number;
  trustedDomains: number;
}

export function PlatformStats({ data }: { data: PlatformStatsData }) {
  return (
    <div className="dashboard-cc">
      <div className="ct"><h3>Platform Intelligence</h3></div>
      <div className="cs">Security &amp; scale metrics from the protection layer.</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '10px 0', borderTop: '1px solid var(--border-lt)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12.5, color: 'var(--text-muted)' }}>
          <span>Total scans (all time)</span>
          <span style={{ fontWeight: 700, color: 'var(--text)', fontFamily: 'sans-serif' }}>{data.totalScans.toLocaleString()}</span>
        </div>
        {data.scansLast30Days != null && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12.5, color: 'var(--text-muted)' }}>
            <span>Scans (last 30 days)</span>
            <span style={{ fontWeight: 700, color: 'var(--green)', fontFamily: 'sans-serif' }}>{data.scansLast30Days.toLocaleString()}</span>
          </div>
        )}
        {data.avgScansPerUser != null && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12.5, color: 'var(--text-muted)' }}>
            <span>Avg scans per user</span>
            <span style={{ fontWeight: 700, color: 'var(--text)', fontFamily: 'sans-serif' }}>{data.avgScansPerUser}</span>
          </div>
        )}
        <div style={{ height: 1, background: 'var(--border-lt)', margin: '4px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12.5, color: 'var(--text-muted)' }}>
          <span>Spam domains blocked</span>
          <span style={{ fontWeight: 700, color: 'var(--orange)', fontFamily: 'sans-serif' }}>{data.spamDomainsBlocked.toLocaleString()}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12.5, color: 'var(--text-muted)' }}>
          <span>Trusted domains</span>
          <span style={{ fontWeight: 700, color: 'var(--green)', fontFamily: 'sans-serif' }}>{data.trustedDomains.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
