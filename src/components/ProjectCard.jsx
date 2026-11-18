import { getCategoryMeta } from './categoryMeta';

/**
 * Intentional typographic project card — no fake screenshots.
 * Uses category colour band + large typographic project initial treatment.
 */
export default function ProjectCard({ project }) {
  const meta = getCategoryMeta(project.category);

  return (
    <article
      className="project-card"
      aria-label={`${project.title} — ${meta.shortLabel}`}
      style={{ borderRadius: '3px' }}
    >
      {/* Category colour band */}
      <div
        className={meta.bandClass}
        aria-hidden="true"
        style={{ height: '4px', width: '100%', flexShrink: 0 }}
      />

      {/* Typographic initial panel */}
      <div
        aria-hidden="true"
        style={{
          height: '7.5rem',
          background: 'var(--paper)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid var(--border)',
          userSelect: 'none',
        }}
      >
        {/* Large faded initial */}
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: '6rem',
            lineHeight: 1,
            color: meta.color,
            opacity: 0.08,
            position: 'absolute',
            right: '0.5rem',
            bottom: '-0.5rem',
            pointerEvents: 'none',
          }}
        >
          {project.title.charAt(0)}
        </span>

        {/* Category abbr pill */}
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6875rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: meta.color,
            background: `${meta.color}18`,
            border: `1px solid ${meta.color}30`,
            borderRadius: '2px',
            padding: '0.3rem 0.75rem',
          }}
        >
          {meta.shortLabel}
        </span>
      </div>

      {/* Card body */}
      <div style={{ padding: '1.25rem 1.375rem 1.5rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '0.75rem' }}>

        {/* Featured badge */}
        {project.featured && (
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.625rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              alignSelf: 'flex-start',
            }}
          >
            ★ Featured
          </span>
        )}

        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.125rem',
            fontWeight: 700,
            color: 'var(--ink)',
            lineHeight: 1.25,
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            lineHeight: 1.65,
            color: 'var(--muted)',
            flex: 1,
          }}
        >
          {project.description}
        </p>

        {/* Stack tags */}
        {project.stack.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
            {project.stack.map((tag) => (
              <span key={tag} className="chip">{tag}</span>
            ))}
          </div>
        )}

        {/* Live link */}
        <div style={{ marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px solid var(--border)' }}>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title} live deployment (opens in new tab)`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              fontFamily: 'var(--font-body)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--accent)',
              textDecoration: 'none',
              transition: 'gap 150ms ease',
            }}
            onMouseEnter={e => e.currentTarget.style.gap = '0.625rem'}
            onMouseLeave={e => e.currentTarget.style.gap = '0.375rem'}
          >
            View Live Site
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M1 11L11 1M11 1H5M11 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}
