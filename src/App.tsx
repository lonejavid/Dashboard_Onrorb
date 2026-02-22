import { useCallback, useEffect, useState } from 'react';
import { fetchDashboard } from './api';
import type { DashboardData, DashboardFilters } from './types';
import {
  ExecutiveSummary,
  Footer,
  Header,
  MetricCards,
  SignupsChart,
  PlanDonut,
  ProviderBar,
  FreeTrialBar,
  SubscriptionStatus,
  RecentSignups,
  ReferralCredits,
  PlatformStats,
} from './components';

const defaultFilters: DashboardFilters = {
  from: '',
  to: '',
  plan: 'all',
  provider: 'all',
  status: 'all',
  subscription: 'all',
};

function App() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<DashboardFilters>(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState<Partial<DashboardFilters>>({});

  const load = useCallback(async (isInitial = false) => {
    if (isInitial) setLoading(true);
    setError(null);
    try {
      const d = await fetchDashboard(appliedFilters);
      setData(d);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, [appliedFilters]);

  useEffect(() => {
    load(true);
    const t = setInterval(() => load(false), 60 * 1000);
    return () => clearInterval(t);
  }, [load]);

  const applyFilters = () => setAppliedFilters({ ...filters });

  return (
    <div style={{ minHeight: '100vh', padding: '1.75rem 2.25rem 2.5rem', maxWidth: 1600, margin: '0 auto' }}>
      <Header
        filters={filters}
        onFiltersChange={setFilters}
        onApply={applyFilters}
        lastSynced={data?.lastSynced}
        loading={loading}
      />
      {error && (
        <div style={{ background: 'var(--accent-red)', color: '#fff', padding: '12px 16px', borderRadius: 8, marginBottom: 16 }}>
          {error}
        </div>
      )}
      {loading && !data && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>Loading dashboard…</div>
      )}
      {data && (
        <>
          <ExecutiveSummary data={data.summary} />
          <section style={{ marginTop: '2rem' }}>
            <h2 style={{ margin: '0 0 1rem', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Key metrics
            </h2>
            <MetricCards summary={data.summary} />
          </section>
          <section style={{ marginTop: '2rem' }}>
            <h2 style={{ margin: '0 0 1rem', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              User growth & distribution
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <SignupsChart data={data.signupsOverTime} />
              <PlanDonut data={data.planDistribution} total={data.summary.totalUsers} />
            </div>
          </section>
          <section style={{ marginTop: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <ProviderBar data={data.signupProvider} />
              <FreeTrialBar data={data.freeTrial} />
            </div>
          </section>
          <section style={{ marginTop: '2rem' }}>
            <h2 style={{ margin: '0 0 1rem', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Subscriptions, activity & platform
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
              <SubscriptionStatus data={data.subscriptionStatus} />
              <RecentSignups data={data.recentSignups} />
              <div>
                <ReferralCredits data={data.referralCredits} />
                <PlatformStats data={data.platformStats} />
              </div>
            </div>
          </section>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
