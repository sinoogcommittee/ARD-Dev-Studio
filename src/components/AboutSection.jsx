import { profile } from '../data/profile';
import { RevealDiv } from '../hooks/useScrollReveal';

const SKILL_GROUPS = [
  {
    label: 'Frontend',
    items: profile.skills.frontend,
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="1" y="2" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="5.5" y1="14" x2="10.5" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="8" y1="12" x2="8" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Backend & Languages',
    items: profile.skills.backendAndLanguages,
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <polyline points="4,5 1,8 4,11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="12,5 15,8 12,11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="10" y1="3" x2="6" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Hosting & Integrations',
    items: profile.skills.hostingAndIntegrations,
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <ellipse cx="8" cy="8" rx="7" ry="3" stroke="currentColor" strokeWidth="1.5"/>
        <ellipse cx="8" cy="8" rx="7" ry="3" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 8 8)"/>
        <ellipse cx="8" cy="8" rx="7" ry="3" stroke="currentColor" strokeWidth="1.5" transform="rotate(-60 8 8)"/>
      </svg>
    ),
  },
  {
    label: 'Systems & Infrastructure',
    items: profile.skills.systems,
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
];

function TimelineEntry({ role, organization, location, period, description, isLast }) {
  return (
    <div style={{ position: 'relative', paddingLeft: '2rem', paddingBottom: isLast ? 0 : '2.5rem' }}>
      {!isLast && <div className="timeline-line" />}
      <div className="timeline-dot" />
      <div>
        <span className="label-caps">{period}</span>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.0625rem',
            fontWeight: 700,
            color: 'var(--ink)',
            lineHeight: 1.3,
            marginTop: '0.4rem',
            marginBottom: '0.2rem',
          }}
        >
          {role}
        </h3>
        <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--muted)', marginBottom: '0.5rem' }}>
          {organization}
          <span style={{ color: 'var(--border)', margin: '0 0.4rem' }}>·</span>
          {location}
        </p>
        <p style={{ fontSize: '0.9rem', lineHeight: 1.65, color: 'var(--ink)', opacity: 0.78 }}>
          {description}
        </p>
      </div>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section-pad"
      style={{ background: '#efebe2', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
    >
      <div className="container">

        {/* Section header */}
        <RevealDiv style={{ marginBottom: '3.5rem' }}>
          <span className="label-caps">Background</span>
          <hr className="hairline" style={{ marginTop: '0.75rem', marginBottom: '1.25rem', maxWidth: '2.5rem', borderColor: 'var(--accent)', borderWidth: '2px' }} />
          <h2
            id="about-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 700,
              color: 'var(--ink)',
              lineHeight: 1.15,
            }}
          >
            Experience &amp; Skills
          </h2>
        </RevealDiv>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 26rem), 1fr))',
            gap: '4rem',
          }}
        >
          {/* Experience timeline */}
          <RevealDiv>
            <h3 className="label-caps" style={{ marginBottom: '1.75rem' }}>Work History</h3>
            {profile.experience.map((exp, i) => (
              <TimelineEntry
                key={i}
                {...exp}
                isLast={i === profile.experience.length - 1}
              />
            ))}
          </RevealDiv>

          {/* Skills */}
          <RevealDiv delay={100}>
            <h3 className="label-caps" style={{ marginBottom: '1.75rem' }}>Technical Skills</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {SKILL_GROUPS.map(({ label, items, icon }) => (
                <div key={label}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.75rem',
                      color: 'var(--accent)',
                    }}
                  >
                    {icon}
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ink)' }}>
                      {label}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {items.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.8rem',
                          color: 'var(--ink)',
                          background: 'var(--paper)',
                          border: '1px solid var(--border)',
                          borderRadius: '2px',
                          padding: '0.25rem 0.65rem',
                          lineHeight: 1.5,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* AI-assisted workflows note */}
            <div
              style={{
                marginTop: '2rem',
                borderTop: '1px solid var(--border)',
                paddingTop: '1.25rem',
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap',
              }}
            >
              <span className="label-caps" style={{ width: '100%', marginBottom: '0.5rem' }}>
                AI-Assisted Engineering
              </span>
              {profile.skills.aiAssistedWorkflows.map((tool) => (
                <span
                  key={tool}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    color: 'var(--accent)',
                    background: 'rgba(184,115,51,0.08)',
                    border: '1px solid rgba(184,115,51,0.25)',
                    borderRadius: '2px',
                    padding: '0.25rem 0.65rem',
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </RevealDiv>
        </div>

        {/* Education & Credentials — compact sub-section */}
        <RevealDiv delay={120} style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--border)' }}>
          <span className="label-caps" style={{ marginBottom: '1rem', display: 'block' }}>Education &amp; Credentials</span>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 22rem), 1fr))',
              gap: '2.5rem',
            }}
          >
            {/* Degrees */}
            <div>
              <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '1.25rem' }}>
                Academic Degrees
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {profile.educationAndCredentials.degrees.map((deg, i) => (
                  <div key={i} style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '1rem' }}>
                    <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--ink)', marginBottom: '0.2rem' }}>
                      {deg.degree}
                    </p>
                    <p style={{ fontSize: '0.8375rem', color: 'var(--muted)', lineHeight: 1.5 }}>{deg.institution}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.2rem', letterSpacing: '0.02em' }}>{deg.period}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Credentials */}
            <div>
              <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '1.25rem' }}>
                Certifications &amp; Eligibilities
              </h3>
              <ul
                role="list"
                style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
              >
                {profile.educationAndCredentials.credentials.map((cred) => (
                  <li
                    key={cred}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.625rem',
                      fontSize: '0.9rem',
                      color: 'var(--ink)',
                      lineHeight: 1.5,
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        flexShrink: 0,
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: 'var(--accent)',
                        marginTop: '0.5rem',
                        display: 'inline-block',
                      }}
                    />
                    {cred}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </RevealDiv>
      </div>
    </section>
  );
}
