export function Footer() {
  return (
    <footer
      style={{
        marginTop: '2.5rem',
        paddingTop: '1.25rem',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}
    >
      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        Confidential · For investor use only · Data is read-only from live platform
      </span>
      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Shield Analytics Dashboard</span>
    </footer>
  );
}
