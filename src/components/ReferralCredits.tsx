const cardStyle: React.CSSProperties = {
  background: 'var(--bg-card)',
  borderRadius: 12,
  padding: '1.25rem',
  border: '1px solid var(--border)',
  boxShadow: 'var(--shadow-card)',
  marginBottom: '1rem',
};

export function ReferralCredits({
  data,
}: {
  data: { usersWithReferralCode: number; referralRewardsGranted: number; avgCreditsPerUser: number };
}) {
  return (
    <div style={cardStyle}>
      <h3 style={{ margin: '0 0 0.35rem', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
        REFERRAL & CREDITS
      </h3>
      <p style={{ margin: '0 0 1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Referral adoption and credit usage.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Users with Referral Code</span>
          <span style={{ fontWeight: 600 }}>{data.usersWithReferralCode}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Referral Rewards Granted</span>
          <span style={{ fontWeight: 600 }}>{data.referralRewardsGranted}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Avg Credits per User</span>
          <span style={{ fontWeight: 600 }}>{data.avgCreditsPerUser}</span>
        </div>
      </div>
    </div>
  );
}
