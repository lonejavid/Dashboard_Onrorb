import { format, parseISO, isValid } from 'date-fns';
import DatePicker from 'react-datepicker';
import type { DashboardFilters } from '../types';

const cardStyle: React.CSSProperties = {
  background: 'var(--bg-card)',
  borderRadius: 14,
  padding: '1.15rem 1.5rem',
  border: '1px solid var(--border)',
  boxShadow: 'var(--shadow-card)',
};

function toDateOrNull(value: string): Date | null {
  if (!value) return null;
  const d = parseISO(value);
  return isValid(d) ? d : null;
}

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

  const fromDate = toDateOrNull(filters.from);
  const toDate = toDateOrNull(filters.to);

  return (
    <header style={{ ...cardStyle, marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Shield Analytics</h1>
          <p style={{ margin: '0.2rem 0 0', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            User & platform intelligence
          </p>
        </div>
        <span
          style={{
            fontSize: '0.65rem',
            fontWeight: 600,
            color: 'var(--text-muted)',
            letterSpacing: '0.08em',
            padding: '4px 8px',
            border: '1px solid var(--border)',
            borderRadius: 6,
          }}
        >
          CONFIDENTIAL
        </span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>From</span>
          <DatePicker
            id="filter-date-from"
            selected={fromDate}
            onChange={(d) => set('from', d ? format(d, 'yyyy-MM-dd') : '')}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/yyyy"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            isClearable
            className="dashboard-date-picker"
          />
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>To</span>
          <DatePicker
            id="filter-date-to"
            selected={toDate}
            onChange={(d) => set('to', d ? format(d, 'yyyy-MM-dd') : '')}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/yyyy"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            isClearable
            className="dashboard-date-picker"
          />
        </label>
        <select
          value={filters.plan}
          onChange={(e) => set('plan', e.target.value)}
          style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: '6px 10px',
            color: 'inherit',
            minWidth: 100,
          }}
        >
          <option value="all">All Plans</option>
          <option value="free">Free</option>
          <option value="pro">Pro</option>
        </select>
        <select
          value={filters.provider}
          onChange={(e) => set('provider', e.target.value)}
          style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: '6px 10px',
            color: 'inherit',
            minWidth: 100,
          }}
        >
          <option value="all">All Providers</option>
          <option value="google">Google</option>
          <option value="local">Local / Email</option>
        </select>
        <select
          value={filters.subscription}
          onChange={(e) => set('subscription', e.target.value)}
          style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: '6px 10px',
            color: 'inherit',
            minWidth: 110,
          }}
        >
          <option value="all">All Subscription</option>
          <option value="trialing">Trialing</option>
          <option value="incomplete">Incomplete</option>
          <option value="active">Active</option>
          <option value="canceled">Canceled</option>
        </select>
        <button
          onClick={onApply}
          disabled={loading}
          style={{
            background: 'var(--accent-blue)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '8px 16px',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          Apply Filters
        </button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: loading ? 'var(--accent-amber)' : 'var(--accent-green)',
            animation: loading ? 'pulse 1s ease infinite' : undefined,
          }}
        />
        <span style={{ fontWeight: 600, color: 'var(--accent-green)' }}>LIVE</span>
        <span>Last synced: {lastSyncStr}</span>
      </div>
    </header>
  );
}
