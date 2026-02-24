export function Footer() {
  return (
    <footer
      style={{
        marginTop: 22,
        paddingTop: 22,
        borderTop: '1px solid var(--border-lt)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}
    >
      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
        Confidential · Data is read-only from live platform
      </span>
      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Shield Analytics Dashboard</span>
    </footer>
  );
}
