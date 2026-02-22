import type { DashboardData, DashboardFilters } from './types';

const API = '/api';

function buildQuery(f: Partial<DashboardFilters>): string {
  const params = new URLSearchParams();
  if (f.from) params.set('from', f.from);
  if (f.to) params.set('to', f.to);
  if (f.plan && f.plan !== 'all') params.set('plan', f.plan);
  if (f.provider && f.provider !== 'all') params.set('provider', f.provider);
  if (f.status && f.status !== 'all') params.set('status', f.status);
  if (f.subscription && f.subscription !== 'all') params.set('subscription', f.subscription);
  const q = params.toString();
  return q ? `?${q}` : '';
}

export async function fetchDashboard(filters: Partial<DashboardFilters>): Promise<DashboardData> {
  const res = await fetch(API + '/dashboard' + buildQuery(filters));
  if (!res.ok) throw new Error('Failed to load dashboard');
  const raw = await res.json();
  return {
    ...raw,
    signupsOverTime: (raw.signupsOverTime || []).map((r: { month: string; count: number }) => ({
      month: r.month,
      count: r.count,
    })),
  };
}
