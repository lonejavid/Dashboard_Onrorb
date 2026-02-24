import { useEffect, useRef, useState } from 'react';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function formatDisplay(d: Date): string {
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

function toYYYYMMDD(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function parseValue(value: string): Date | null {
  if (!value || value.length !== 10) return null;
  const [y, m, day] = value.split('-').map(Number);
  if (!y || !m || !day) return null;
  const d = new Date(y, m - 1, day);
  return isNaN(d.getTime()) ? null : d;
}

const today = new Date();
today.setHours(0, 0, 0, 0);

const CalendarIcon = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" aria-hidden>
    <rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
    <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export function CustomDatePicker({
  type,
  value,
  onChange,
}: {
  type: 'from' | 'to';
  value: string;
  onChange: (value: string) => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const initialFromValue = parseValue(value);
  const [year, setYear] = useState(initialFromValue?.getFullYear() ?? today.getFullYear());
  const [month, setMonth] = useState(initialFromValue?.getMonth() ?? today.getMonth());
  const [selected, setSelected] = useState<Date | null>(initialFromValue);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const parsed = parseValue(value);
    if (parsed) {
      setSelected(parsed);
      setYear(parsed.getFullYear());
      setMonth(parsed.getMonth());
    } else {
      setSelected(null);
    }
  }, [value]);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [open]);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handleNav = (dir: number) => {
    let m = month + dir;
    let y = year;
    if (m > 11) { m = 0; y++; }
    if (m < 0) { m = 11; y--; }
    setMonth(m);
    setYear(y);
  };

  const handlePickDay = (d: number) => {
    setSelected(new Date(year, month, d));
  };

  const handleConfirm = () => {
    if (selected) {
      onChange(toYYYYMMDD(selected));
      setOpen(false);
    }
  };

  const handleClose = () => setOpen(false);

  const displayVal = selected ? formatDisplay(selected) : 'Select date';
  const label = type === 'from' ? 'From' : 'To';

  return (
    <div
      ref={wrapRef}
      className={`dp-wrap ${type === 'from' ? 'is-from' : 'is-to'}`}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className={`dp-btn ${open ? 'active' : ''} ${selected ? 'has-date' : ''}`}
        onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className="dp-btn-icon">
          <CalendarIcon />
        </span>
        <span className="dp-btn-text">
          <span className="dp-btn-label">{label}</span>
          <span className="dp-btn-val">{displayVal}</span>
        </span>
      </button>

      <div className={`dp-cal ${open ? 'open' : ''}`} role="dialog" aria-label={`Pick ${label} date`}>
        <div className="dpc-head">
          <span className={`dpc-label dpc-which-is-${type}`}>
            Pick <span>{label}</span> date
          </span>
        </div>
        <div className="dpc-nav">
          <button type="button" className="dpc-navbtn" onClick={() => handleNav(-1)} aria-label="Previous month">
            ‹
          </button>
          <div className="dpc-month">
            {MONTHS[month]}
            <small>{year}</small>
          </div>
          <button type="button" className="dpc-navbtn" onClick={() => handleNav(1)} aria-label="Next month">
            ›
          </button>
        </div>
        <div className="dpc-grid">
          {DAYS.map((d) => (
            <div key={d} className="dpc-dow">
              {d}
            </div>
          ))}
          {Array.from({ length: firstDay }, (_, i) => (
            <div key={`empty-${i}`} className="dpc-day empty" />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const d = i + 1;
            const date = new Date(year, month, d);
            const isToday = date.toDateString() === today.toDateString();
            const isSel = selected && date.toDateString() === selected.toDateString();
            return (
              <div
                key={d}
                className={`dpc-day ${isToday ? 'today' : ''} ${isSel ? 'selected' : ''}`}
                onClick={() => handlePickDay(d)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handlePickDay(d)}
              >
                {d}
              </div>
            );
          })}
        </div>
        <div className="dpc-footer">
          <button type="button" className="dpc-fbtn cancel" onClick={handleClose}>
            Cancel
          </button>
          <button type="button" className="dpc-fbtn confirm" onClick={handleConfirm}>
            {type === 'from' ? 'Set From Date' : 'Set To Date'}
          </button>
        </div>
      </div>
    </div>
  );
}
