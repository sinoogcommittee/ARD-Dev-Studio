import { profile } from '../data/profile';

const handleScroll = (e, href) => {
  e.preventDefault();
  const target = document.querySelector(href);
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      style={{
        background: 'var(--ink)',
        color: 'rgba(245,240,232,0.75)',
        borderTop: '1px solid rgba(245,240,232,0.08)',
        padding: '3rem 1.5rem',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '2rem',
          }}
        >
          {/* Identity */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.125rem',
                fontWeight: 700,
                color: 'rgba(245,240,232,0.95)',
                marginBottom: '0.3rem',
              }}
            >
              {profile.identity.name}
            </p>
            <p style={{ fontSize: '0.8125rem', lineHeight: 1.6 }}>
              {profile.identity.role}
              <br />
              {profile.identity.location}
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul
              role="list"
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                gap: '1.5rem',
                flexWrap: 'wrap',
              }}
            >
              {[
                { label: 'Work',    href: '#work' },
                { label: 'About',   href: '#about' },
                { label: 'Contact', href: '#contact' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => handleScroll(e, href)}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: 'rgba(245,240,232,0.6)',
                      transition: 'color 150ms ease',
                    }}
                    onMouseEnter={e => e.target.style.color = 'rgba(245,240,232,0.95)'}
                    onMouseLeave={e => e.target.style.color = 'rgba(245,240,232,0.6)'}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.4)', marginBottom: '0.25rem' }}>
              Contact
            </span>
            <a
              href={`mailto:${profile.contact.email}`}
              style={{ fontSize: '0.875rem', color: 'rgba(184,115,51,0.9)', transition: 'color 150ms ease' }}
              onMouseEnter={e => e.target.style.color = 'var(--accent)'}
              onMouseLeave={e => e.target.style.color = 'rgba(184,115,51,0.9)'}
            >
              {profile.contact.email}
            </a>
            <a
              href={`tel:${profile.contact.phone.replace(/\s/g, '')}`}
              style={{ fontSize: '0.875rem', color: 'rgba(245,240,232,0.6)', transition: 'color 150ms ease' }}
              onMouseEnter={e => e.target.style.color = 'rgba(245,240,232,0.95)'}
              onMouseLeave={e => e.target.style.color = 'rgba(245,240,232,0.6)'}
            >
              {profile.contact.phone}
            </a>
            <a
              href={profile.contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '0.875rem', color: 'rgba(245,240,232,0.6)', transition: 'color 150ms ease' }}
              onMouseEnter={e => e.target.style.color = 'rgba(245,240,232,0.95)'}
              onMouseLeave={e => e.target.style.color = 'rgba(245,240,232,0.6)'}
            >
              Facebook Profile
            </a>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(245,240,232,0.1)' }} />

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <p style={{ fontSize: '0.78125rem', color: 'rgba(245,240,232,0.4)' }}>
            &copy; {year} {profile.identity.name}. All rights reserved.
          </p>
          <p style={{ fontSize: '0.78125rem', color: 'rgba(245,240,232,0.4)' }}>
            {profile.identity.availability}
          </p>
        </div>
      </div>
    </footer>
  );
}
