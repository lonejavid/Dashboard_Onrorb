export function SectionTitle({ title, description }: { title: string; description?: string }) {
  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <h2 style={{ margin: 0, fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        {title}
      </h2>
      {description && (
        <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{description}</p>
      )}
    </div>
  );
}
