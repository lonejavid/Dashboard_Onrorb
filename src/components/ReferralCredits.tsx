export function ReferralCredits({
  data,
}: {
  data: { usersWithReferralCode: number; referralRewardsGranted: number; avgCreditsPerUser: number };
}) {
  return (
    <div className="dashboard-cc" style={{ marginBottom: '1rem' }}>
      <div className="ct"><h3>Referral &amp; Credits</h3></div>
      <div className="cs">Referral adoption and credit usage.</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '10px 0', borderBottom: '1px solid var(--border-lt)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: 'var(--text-muted)' }}>
          <span>Users with Referral Code</span>
          <span style={{ fontWeight: 700, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>{data.usersWithReferralCode}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: 'var(--text-muted)' }}>
          <span>Referral Rewards Granted</span>
          <span style={{ fontWeight: 700, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>{data.referralRewardsGranted}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: 'var(--text-muted)' }}>
          <span>Avg Credits per User</span>
          <span style={{ fontWeight: 700, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>{data.avgCreditsPerUser}</span>
        </div>
      </div>
    </div>
  );
}
