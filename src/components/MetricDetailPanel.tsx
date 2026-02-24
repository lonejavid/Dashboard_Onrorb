import { useEffect, useRef, useState } from 'react';
import type { DashboardData } from '../types';
import type { MetricKey } from './MetricCards';
import { PlanDonut } from './PlanDonut';
import { SubscriptionStatus } from './SubscriptionStatus';

export type { MetricKey };

const TITLES: Record<MetricKey, string> = {
  totalUsers: 'Total users',
  proUsers: 'Pro users',
  freeUsers: 'Free users',
  activeUsers: 'Active users (30d)',
  signups: 'Signups this month',
};

function formatMonth(iso: string): string {
  try {
    return new Date(iso).toLocaleString('default', { month: 'short', year: 'numeric' });
  } catch {
    return iso;
  }
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((s) => s[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return iso;
  }
}

/* Dashboard theme accents for modal (green/orange) */
const ACCENT = { green: '#4caf78', greenBg: 'rgba(45,122,79,0.2)', orange: '#ff7a24', orangeBg: 'rgba(232,97,10,0.2)' } as const;

const AVATAR_COLORS: Record<string, { bg: string; color: string }> = {
  pro: { bg: ACCENT.orangeBg, color: ACCENT.orange },
  free: { bg: ACCENT.greenBg, color: ACCENT.green },
  green: { bg: ACCENT.greenBg, color: ACCENT.green },
  amber: { bg: ACCENT.orangeBg, color: ACCENT.orange },
};

function getAvatarStyle(plan: string): React.CSSProperties {
  const key = plan === 'pro' ? 'pro' : plan === 'free' ? 'free' : ['green', 'amber'][plan.length % 2] as 'green' | 'amber';
  const { bg, color } = AVATAR_COLORS[key] || AVATAR_COLORS.free;
  return { background: bg, color };
}

export function MetricDetailPanel({
  metric,
  data,
  onClose,
}: {
  metric: MetricKey;
  data: DashboardData;
  onClose: () => void;
}) {
  const [isClosing, setIsClosing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleClose = () => setIsClosing(true);

  useEffect(() => {
    if (!isClosing) return;
    const t = setTimeout(onClose, 220);
    return () => clearTimeout(t);
  }, [isClosing, onClose]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const s = data.summary;
  const recentPro = data.recentSignups.filter((u) => u.plan === 'pro');
  const recentFree = data.recentSignups.filter((u) => u.plan === 'free');

  const renderRecentUsers = (list: { id: string; name: string; date: string; plan: string }[], limit: number, _badge?: 'FREE' | 'PRO') => {
    const items = list.slice(0, limit);
    return (
      <div className="users-list">
        {items.map((u) => (
          <div key={u.id} className="user-row">
            <div className="user-left">
              <div className="avatar" style={getAvatarStyle(u.plan)}>
                {initials(u.name)}
              </div>
              <div>
                <div className="user-name">{u.name}</div>
                <div className="user-date">{formatDate(u.date)}</div>
              </div>
            </div>
            <span className={u.plan === 'pro' ? 'pro-badge' : 'free-badge'}>{u.plan === 'pro' ? 'PRO' : 'FREE'}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      ref={contentRef}
      className={`metric-popup-backdrop ${isClosing ? 'metric-popup-exit' : ''}`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Detailed data for ${TITLES[metric]}`}
    >
      <div className="metric-popup-box" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <div className="modal-title">Data for: {TITLES[metric]}</div>
            <div className="modal-subtitle">Shield Analytics · Live Data</div>
          </div>
          <button type="button" className="close-btn" onClick={handleClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="modal-body">
          {/* Total users */}
          {metric === 'totalUsers' && (
            <>
              <div>
                <div className="section-label">Summary</div>
                <div className="summary-box">
                  <div className="summary-num">{s.totalUsers}</div>
                  <div className="summary-text">
                    Total users with <span className="summary-pct">{s.proUsers} Pro ({s.proPercent}%)</span> and{' '}
                    <span className="summary-pct">{s.freeUsers} Free ({s.freePercent}%)</span>.{' '}
                    <span className="summary-pct">{s.activeUsers}</span> active in last 30d ({s.activeRatePercent}% rate).
                  </div>
                </div>
              </div>
              <div>
                <div className="section-label">Plan distribution</div>
                <div className="donut-wrap">
                  <PlanDonut data={data.planDistribution} total={s.totalUsers} noCard />
                  <div className="donut-legend">
                    {data.planDistribution.map((d, i) => (
                      <div key={d.plan} className="legend-row">
                        <div className="legend-left">
                          <div
                            className="legend-dot"
                            style={{
                              background: ['#2563eb', '#7c3aed', '#06b6d4'][i % 3],
                            }}
                          />
                          {d.plan.charAt(0).toUpperCase() + d.plan.slice(1)}
                        </div>
                        <div className="legend-val">
                          {d.percent}% · {d.count}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <div className="section-label">Signup provider</div>
                <div className="trial-grid">
                  {data.signupProvider.map((d) => (
                    <div key={d.provider} className="trial-row">
                      <div className="trial-label">{d.provider}</div>
                      <div className="trial-val" style={{ color: '#94a3b8' }}>
                        {d.count} users ({d.percent}%)
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="section-label">Referral & credits</div>
                <div className="trial-grid">
                  <div className="trial-row">
                    <div className="trial-label">Users with referral code</div>
                    <div className="trial-val" style={{ color: '#818cf8' }}>{data.referralCredits.usersWithReferralCode}</div>
                  </div>
                  <div className="trial-row">
                    <div className="trial-label">Referral rewards granted</div>
                    <div className="trial-val" style={{ color: '#818cf8' }}>{data.referralCredits.referralRewardsGranted}</div>
                  </div>
                  <div className="trial-row">
                    <div className="trial-label">Avg credits per user</div>
                    <div className="trial-val" style={{ color: '#818cf8' }}>{data.referralCredits.avgCreditsPerUser}</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="section-label">Recent signups</div>
                {renderRecentUsers(data.recentSignups, 20, 'FREE')}
              </div>
            </>
          )}

          {/* Pro users */}
          {metric === 'proUsers' && (
            <>
              <div>
                <div className="section-label">Summary</div>
                <div className="summary-box">
                  <div className="summary-num">{s.proUsers}</div>
                  <div className="summary-text">
                    Pro users representing <span className="summary-pct">{s.proPercent}%</span> of all users (paid tier).
                  </div>
                </div>
              </div>
              <div>
                <div className="section-label">Plan distribution</div>
                <div className="donut-wrap">
                  <PlanDonut data={data.planDistribution} total={s.totalUsers} noCard />
                  <div className="donut-legend">
                    {data.planDistribution.map((d, i) => (
                      <div key={d.plan} className="legend-row">
                        <div className="legend-left">
                          <div className="legend-dot" style={{ background: ['#2563eb', '#7c3aed'][i % 2] }} />
                          {d.plan.charAt(0).toUpperCase() + d.plan.slice(1)}
                        </div>
                        <div className="legend-val">{d.percent}% · {d.count}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <div className="section-label">Subscription status (all users)</div>
                <SubscriptionStatus data={data.subscriptionStatus} noCard />
              </div>
              <div>
                <div className="section-label">Recent Pro users</div>
                {renderRecentUsers(recentPro, 20, 'PRO')}
              </div>
            </>
          )}

          {/* Free users */}
          {metric === 'freeUsers' && (
            <>
              <div>
                <div className="section-label">Summary</div>
                <div className="summary-box">
                  <div className="summary-num">{s.freeUsers}</div>
                  <div className="summary-text">
                    Free users representing <span className="summary-pct">{s.freePercent}%</span> of all users on the platform.
                  </div>
                </div>
              </div>
              <div>
                <div className="section-label">Plan distribution</div>
                <div className="donut-wrap">
                  <PlanDonut data={data.planDistribution} total={s.totalUsers} noCard />
                  <div className="donut-legend">
                    {data.planDistribution.map((d) => (
                      <div key={d.plan} className="legend-row">
                        <div className="legend-left">
                          <div className="legend-dot" style={{ background: d.plan === 'pro' ? '#e8610a' : '#2d7a4f' }} />
                          {d.plan.charAt(0).toUpperCase() + d.plan.slice(1)}
                        </div>
                        <div className="legend-val">{d.percent}% · {d.count}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <div className="section-label">Free trial</div>
                <div className="trial-grid">
                  {data.freeTrial.map((d) => (
                    <div key={d.label} className="trial-row">
                      <div className="trial-label">
                        <div
                          className="trial-dot"
                          style={{
                            background: d.label.toLowerCase().includes('claimed') ? '#34d399' : '#f87171',
                          }}
                        />
                        {d.label}
                      </div>
                      <div
                        className="trial-val"
                        style={{ color: d.label.toLowerCase().includes('claimed') ? '#34d399' : '#f87171' }}
                      >
                        {d.count} ({d.percent}%)
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="section-label">Recent Free users</div>
                {renderRecentUsers(recentFree, 20, 'FREE')}
              </div>
            </>
          )}

          {/* Active users (30d) */}
          {metric === 'activeUsers' && (
            <>
              <div>
                <div className="section-label">Summary</div>
                <div className="summary-box">
                  <div className="summary-num">{s.activeUsers}</div>
                  <div className="summary-text">
                    Active users in the last 30 days · <span className="summary-pct">{s.activeRatePercent}%</span> activation rate.
                  </div>
                </div>
              </div>
              <div>
                <div className="section-label">Subscription status</div>
                <SubscriptionStatus data={data.subscriptionStatus} noCard />
              </div>
              <div>
                <div className="section-label">Platform activity (scans)</div>
                <div className="trial-grid">
                  <div className="trial-row">
                    <div className="trial-label">Total scans (all time)</div>
                    <div className="trial-val" style={{ color: '#94a3b8' }}>{data.platformStats.totalScans.toLocaleString()}</div>
                  </div>
                  {data.platformStats.scansLast30Days != null && (
                    <div className="trial-row">
                      <div className="trial-label">Scans (last 30 days)</div>
                      <div className="trial-val" style={{ color: '#818cf8' }}>{data.platformStats.scansLast30Days.toLocaleString()}</div>
                    </div>
                  )}
                  {data.platformStats.avgScansPerUser != null && (
                    <div className="trial-row">
                      <div className="trial-label">Avg scans per user</div>
                      <div className="trial-val" style={{ color: '#94a3b8' }}>{data.platformStats.avgScansPerUser}</div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="section-label">Free trial (claimed vs not)</div>
                <div className="trial-grid">
                  {data.freeTrial.map((d) => (
                    <div key={d.label} className="trial-row">
                      <div className="trial-label">
                        <div className="trial-dot" style={{ background: d.label.toLowerCase().includes('claimed') ? '#34d399' : '#f87171' }} />
                        {d.label}
                      </div>
                      <div className="trial-val" style={{ color: d.label.toLowerCase().includes('claimed') ? '#34d399' : '#f87171' }}>
                        {d.count} ({d.percent}%)
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Signups this month */}
          {metric === 'signups' && (
            <>
              <div>
                <div className="section-label">Summary</div>
                <div className="summary-box">
                  <div className="summary-num">{s.signupsThisMonth}</div>
                  <div className="summary-text">
                    Signups this month
                    {s.signupsLastMonth != null && (
                      <> · Last month: <span className="summary-pct">{s.signupsLastMonth}</span></>
                    )}
                    {s.signupGrowthPercent != null && (
                      <> · <span className="summary-pct">{s.signupGrowthPercent >= 0 ? '+' : ''}{s.signupGrowthPercent}%</span> vs last month</>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div className="section-label">Signups over time (by month)</div>
                <div className="trial-grid">
                  {[...data.signupsOverTime].reverse().slice(0, 12).map((r) => (
                    <div key={r.month} className="trial-row">
                      <div className="trial-label">{formatMonth(r.month)}</div>
                      <div className="trial-val" style={{ color: '#94a3b8' }}>{r.count}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="section-label">Signup provider</div>
                <div className="trial-grid">
                  {data.signupProvider.map((d) => (
                    <div key={d.provider} className="trial-row">
                      <div className="trial-label">{d.provider}</div>
                      <div className="trial-val" style={{ color: '#94a3b8' }}>{d.count} ({d.percent}%)</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="section-label">Recent signups</div>
                {renderRecentUsers(data.recentSignups, 20, 'FREE')}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button type="button" className="btn-close" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
