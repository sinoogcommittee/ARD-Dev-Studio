import { useState } from 'react';

const NAV_LINKS = [
  { label: 'Work',    href: '#work' },
  { label: 'About',   href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <header id="site-nav" role="banner">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', height: '3.5rem' }}>

          {/* Wordmark */}
          <a
            href="#main-content"
            onClick={(e) => handleNav(e, '#main-content')}
            aria-label="Anthony Riel C. Diango — back to top"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1.0625rem',
              color: 'var(--ink)',
              letterSpacing: '-0.01em',
              lineHeight: 1,
            }}
          >
            Riel Diango
          </a>

          {/* Desktop nav */}
          <nav aria-label="Primary navigation" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <ul
              role="list"
              className="desktop-nav"
              style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}
            >
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => handleNav(e, href)}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: 'var(--muted)',
                      letterSpacing: '0.02em',
                      transition: 'color 150ms ease',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e => e.target.style.color = 'var(--ink)'}
                    onMouseLeave={e => e.target.style.color = 'var(--muted)'}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Contact CTA — desktop */}
            <a
              href="#contact"
              onClick={(e) => handleNav(e, '#contact')}
              className="btn-primary"
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.8125rem' }}
            >
              Get in Touch
            </a>

            {/* Hamburger — mobile only */}
            <button
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(o => !o)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                color: 'var(--ink)',
              }}
              className="hamburger-btn"
            >
              {menuOpen ? (
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              )}
            </button>
          </nav>
        </div>

        {/* Mobile menu */}
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className={`mobile-menu${menuOpen ? ' open' : ''}`}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleNav(e, href)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.0625rem',
                fontWeight: 500,
                color: 'var(--ink)',
                padding: '0.75rem 0',
                borderBottom: '1px solid var(--border)',
                display: 'block',
              }}
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNav(e, '#contact')}
            className="btn-primary"
            style={{ marginTop: '1rem', alignSelf: 'flex-start' }}
          >
            Get in Touch
          </a>
        </nav>
      </header>

      <style>{`
        @media (max-width: 680px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
          #site-nav nav > a.btn-primary { display: none !important; }
        }
      `}</style>
    </>
  );
}
