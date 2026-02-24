import { useCallback, useEffect, useState } from 'react';
import { fetchDashboard } from './api';
import type { DashboardData, DashboardFilters } from './types';
import {
  ExecutiveSummary,
  Footer,
  Header,
  MetricCards,
  MetricDetailPanel,
  SignupsChart,
  PlanDonut,
  ProviderBar,
  FreeTrialBar,
  SubscriptionStatus,
  RecentSignups,
  ReferralCredits,
  PlatformStats,
} from './components';
import type { MetricKey } from './components';

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
  const [selectedMetric, setSelectedMetric] = useState<MetricKey | null>(null);

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
    <div style={{ minHeight: '100vh' }}>
      <Header
        filters={filters}
        onFiltersChange={setFilters}
        onApply={applyFilters}
        lastSynced={data?.lastSynced}
        loading={loading}
      />
      <main className="dashboard-main">
        {error && (
          <div style={{ background: 'var(--orange)', color: '#fff', padding: '12px 16px', borderRadius: 8, marginBottom: 16 }}>
            {error}
          </div>
        )}
        {loading && !data && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading dashboard…</div>
        )}
        {data && (
          <>
            <ExecutiveSummary data={data.summary} />
            <section>
              <div className="dashboard-sec-h">
                <h2>Key Metrics</h2>
                <p>Click any card for detailed data.</p>
              </div>
              <MetricCards
              summary={data.summary}
              selectedMetric={selectedMetric}
              onSelectMetric={(key) => setSelectedMetric((prev) => (prev === key ? null : key))}
            />
            {selectedMetric && (
              <MetricDetailPanel
                metric={selectedMetric}
                data={data}
                onClose={() => setSelectedMetric(null)}
              />
            )}
            </section>
            <section>
              <div className="dashboard-sec-h">
                <h2>User Growth &amp; Distribution</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1.65fr 1fr', gap: 13 }}>
                <SignupsChart data={data.signupsOverTime} summary={data.summary} />
                <PlanDonut data={data.planDistribution} total={data.summary.totalUsers} />
              </div>
            </section>
            <section>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 13 }}>
                <ProviderBar data={data.signupProvider} />
                <FreeTrialBar data={data.freeTrial} />
              </div>
            </section>
            <section>
              <div className="dashboard-sec-h">
                <h2>Platform Performance</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 13 }}>
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
      </main>
    </div>
  );
}

export default App;
