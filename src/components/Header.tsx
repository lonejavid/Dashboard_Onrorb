import type { DashboardFilters } from '../types';
import { CustomDatePicker } from './CustomDatePicker';

export function Header({
  filters,
  onFiltersChange,
  onApply,
  lastSynced,
  loading,
}: {
  filters: DashboardFilters;
  onFiltersChange: (f: DashboardFilters) => void;
  onApply: () => void;
  lastSynced?: string;
  loading?: boolean;
}) {
  const set = (k: keyof DashboardFilters, v: string) => onFiltersChange({ ...filters, [k]: v });
  const lastSyncStr = lastSynced
    ? new Date(lastSynced).toLocaleString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '—';

  return (
    <header className="dashboard-hdr">
      <div className="dashboard-hdr-l">
       <div>
  <div className="dashboard-logo">
    <img
      src="/logo.png"
      alt="Shield Analytics"
      className="dashboard-logo-img"
    />

    <div className="dashboard-logo-text-wrap">
      <span className="dashboard-logo-text">
        Shield Analytics
      </span>

      <div className="dashboard-hdr-sub">
        User &amp; platform intelligence
      </div>
    </div>
  </div>
</div>
        <div className={`dashboard-live ${loading ? 'dashboard-live-loading' : ''}`}>
          <div className="dashboard-live-dot" style={{ opacity: loading ? 0.5 : 1 }} />
          LIVE &nbsp;·&nbsp; Last synced: {lastSyncStr}
        </div>
      </div>
      <div className="dashboard-hdr-r">
        <CustomDatePicker type="from" value={filters.from} onChange={(v) => set('from', v)} />
        <span className="dp-arrow">→</span>
        <CustomDatePicker type="to" value={filters.to} onChange={(v) => set('to', v)} />
        <select
          value={filters.plan}
          onChange={(e) => set('plan', e.target.value)}
          className="dashboard-sel"
        >
          <option value="all">All Plans</option>
          <option value="free">Free</option>
          <option value="pro">Pro</option>
        </select>
        <select
          value={filters.provider}
          onChange={(e) => set('provider', e.target.value)}
          className="dashboard-sel"
        >
          <option value="all">All Providers</option>
          <option value="google">Google</option>
          <option value="local">Local / Email</option>
        </select>
        <select
          value={filters.subscription}
          onChange={(e) => set('subscription', e.target.value)}
          className="dashboard-sel"
        >
          <option value="all">All Subscription</option>
          <option value="trialing">Trialing</option>
          <option value="incomplete">Incomplete</option>
          <option value="active">Active</option>
          <option value="canceled">Canceled</option>
        </select>
        <button type="button" className="dashboard-btn" onClick={onApply} disabled={loading}>
          Apply Filters
        </button>
      </div>
    </header>
  );
}
