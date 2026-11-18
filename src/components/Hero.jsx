import { profile } from '../data/profile';

const handleScroll = (e, href) => {
  e.preventDefault();
  const target = document.querySelector(href);
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default function Hero() {
  return (
    <section
      id="main-content"
      aria-label="Introduction"
      style={{
        background: 'var(--paper)',
        borderBottom: '1px solid var(--border)',
        padding: '5.5rem 1.5rem 5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background grid texture */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          opacity: 0.35,
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative' }}>
        <div style={{ maxWidth: '52rem' }}>

          {/* Availability badge */}
          <div
            className="anim-fade-up anim-delay-1"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.75rem',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#5a9e6f',
                display: 'inline-block',
                boxShadow: '0 0 0 3px rgba(90,158,111,0.25)',
              }}
            />
            <span className="label-caps" style={{ color: '#5a9e6f' }}>
              {profile.identity.availability}
            </span>
          </div>

          {/* Name */}
          <h1
            className="anim-fade-up anim-delay-2"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              color: 'var(--ink)',
              marginBottom: '0.5rem',
              letterSpacing: '-0.02em',
            }}
          >
            Anthony Riel
            <br />
            <span style={{ color: 'var(--accent)' }}>C. Diango</span>
          </h1>

          {/* Role */}
          <p
            className="anim-fade-up anim-delay-3"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1rem, 2.5vw, 1.3125rem)',
              fontStyle: 'italic',
              fontWeight: 400,
              color: 'var(--muted)',
              marginBottom: '1.5rem',
              letterSpacing: '0.01em',
            }}
          >
            Full-Stack Web Developer &amp; Technical Support
          </p>

          {/* Summary */}
          <p
            className="anim-fade-up anim-delay-3"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.0625rem',
              lineHeight: 1.7,
              color: 'var(--ink)',
              maxWidth: '44rem',
              marginBottom: '2.5rem',
              opacity: 0.85,
            }}
          >
            {profile.identity.summary}
          </p>

          {/* CTAs */}
          <div
            className="anim-fade-up anim-delay-4"
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}
          >
            <a
              href="#work"
              onClick={(e) => handleScroll(e, '#work')}
              className="btn-primary"
            >
              View Projects
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="#contact"
              onClick={(e) => handleScroll(e, '#contact')}
              className="btn-outline"
            >
              Contact Me
            </a>
          </div>

          {/* Résumé claim */}
          <p
            className="anim-fade-up anim-delay-5"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8125rem',
              color: 'var(--muted)',
              marginTop: '2.25rem',
              borderTop: '1px solid var(--border)',
              paddingTop: '1.25rem',
              letterSpacing: '0.01em',
            }}
          >
            {profile.identity.resumeClaim}
            <span style={{ margin: '0 0.6rem', color: 'var(--border)' }}>·</span>
            <span>Guinacot, Guindulman, Bohol, Philippines</span>
          </p>
        </div>
      </div>
    </section>
  );
}
