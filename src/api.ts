import type { DashboardData, DashboardFilters } from './types';

// On Vercel, always use relative /api so the vercel.json rewrite proxies to the backend (avoids CORS).
const isVercel =
  typeof window !== 'undefined' && window.location.hostname.endsWith('vercel.app');
const API_BASE =
  isVercel ? '' : (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');
const API = API_BASE ? `${API_BASE}/api` : '/api';

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
