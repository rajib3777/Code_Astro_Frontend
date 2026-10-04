interface SectionHeaderProps {
  eyebrow?: string
  title: string
  titleHighlight?: string
  description?: string
  align?: 'center' | 'left'
  maxWidth?: string
  className?: string
  eyebrowIcon?: React.ReactNode
}

/**
 * Reusable section header with consistent centering, spacing, and typography.
 * Eliminates per-section hacks. Use across ALL sections for visual consistency.
 */
export default function SectionHeader({
  eyebrow,
  title,
  titleHighlight,
  description,
  align = 'center',
  maxWidth = '720px',
  className = '',
  eyebrowIcon,
}: SectionHeaderProps) {
  const textAlign = align === 'center' ? 'text-center' : 'text-left'
  const mx = align === 'center' ? 'mx-auto' : ''

  // Split title to apply gradient to highlighted portion
  let titleNode: React.ReactNode = title
  if (titleHighlight && title.includes(titleHighlight)) {
    const [before, after] = title.split(titleHighlight)
    titleNode = (
      <>
        {before}
        <span className="gradient-text">{titleHighlight}</span>
        {after}
      </>
    )
  }

  return (
    <div
      className={`section-header-block ${textAlign} ${mx} ${className}`}
      style={{ maxWidth, marginBottom: '3.5rem' }}
    >
      {eyebrow && (
        <div className="flex items-center gap-2 mb-4" style={{ justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
          <span className="badge-glow">
            {eyebrowIcon && <span className="mr-1">{eyebrowIcon}</span>}
            {eyebrow}
          </span>
        </div>
      )}

      <h2 className="text-section" style={{ color: 'var(--text-primary)', marginBottom: description ? '1rem' : 0 }}>
        {titleNode}
      </h2>

      {description && (
        <p
          className="t-body"
          style={{
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: align === 'center' ? '0 auto' : '0',
            lineHeight: 1.75,
          }}
        >
          {description}
        </p>
      )}
    </div>
  )
}
