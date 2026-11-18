import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import { projects } from '../data/projects';
import { profile } from '../data/profile';
import { RevealDiv } from '../hooks/useScrollReveal';

// 4 featured projects representing all 4 core domains for preview
const FEATURED_IDS = [
  'dentaprime-clinic-portal',
  'ekumbati-district-portal',
  'sinoog-2027-event-hub',
  'smart-ftnhs-management',
];
const FEATURED = FEATURED_IDS.map((id) => projects.find((p) => p.id === id)).filter(Boolean);

// Top 8 skills for the About preview
const TOP_SKILLS = [
  ...profile.skills.frontend.slice(0, 3),
  ...profile.skills.backendAndLanguages.slice(0, 3),
  ...profile.skills.hostingAndIntegrations.slice(0, 2),
];

export default function HomePage({ currentStatus }) {
  return (
    <>
      {/* ── Hero (preserved exactly) ──────────────────────────────── */}
      <Hero currentStatus={currentStatus} />

      {/* ── Projects Preview ──────────────────────────────────────── */}
      <section
        aria-labelledby="home-projects-heading"
        className="section-spacing bg-[#17191E] border-b border-[#292C32] relative"
      >
        {/* Glow */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#D6AD63]/4 rounded-full blur-[120px] pointer-events-none"
        />
        <div className="container-custom relative z-10">
          <RevealDiv className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6AD63]" />
              <span className="mono-caps text-[#D6AD63]">Live Deployments</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2
                id="home-projects-heading"
                className="font-display text-3xl sm:text-4xl font-bold text-[#F2F0EB] tracking-tight"
              >
                Production Systems
              </h2>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-sm font-mono text-[#D6AD63] hover:text-[#E5BE75] transition-colors group shrink-0"
              >
                View all 16 projects
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  className="group-hover:translate-x-0.5 transition-transform"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </RevealDiv>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURED.map((project, i) => (
              <RevealDiv key={project.id} style={{ transitionDelay: `${i * 80}ms` }}>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full bg-[#101114] border border-[#292C32] rounded-xl p-5 hover:border-[#D6AD63]/60 hover:shadow-[0_0_28px_rgba(214,173,99,0.08)] transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#D6AD63] bg-[#D6AD63]/10 px-2 py-0.5 rounded">
                      {project.category.split(',')[0].trim()}
                    </span>
                    <svg
                      width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className="text-[#71717A] group-hover:text-[#D6AD63] transition-colors shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-base text-[#F2F0EB] mb-2 group-hover:text-[#D6AD63] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#71717A] leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#17191E] border border-[#292C32] text-[#A1A1AA]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </a>
              </RevealDiv>
            ))}
          </div>

          <RevealDiv className="mt-8 text-center">
            <Link to="/projects" className="btn-gold-primary border-beam inline-flex items-center gap-2 text-sm py-2.5 px-6">
              Explore All 16 Deployments
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </RevealDiv>
        </div>
      </section>

      {/* ── About Preview ─────────────────────────────────────────── */}
      <section
        aria-labelledby="home-about-heading"
        className="section-spacing bg-[#101114] border-b border-[#292C32] relative overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#D6AD63]/5 rounded-full blur-[120px] pointer-events-none"
        />
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Copy */}
            <RevealDiv>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D6AD63]" />
                <span className="mono-caps text-[#D6AD63]">Developer Profile</span>
              </div>
              <h2
                id="home-about-heading"
                className="font-display text-3xl sm:text-4xl font-bold text-[#F2F0EB] tracking-tight mb-5"
              >
                About &amp; Skills
              </h2>
              <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed mb-3">
                {profile.identity.summary}
              </p>
              <p className="text-sm text-[#71717A] leading-relaxed mb-7">
                {profile.identity.resumeClaim}
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-mono text-[#D6AD63] hover:text-[#E5BE75] transition-colors group"
              >
                View full profile &amp; experience
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  className="group-hover:translate-x-0.5 transition-transform"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </RevealDiv>

            {/* Skills grid */}
            <RevealDiv style={{ transitionDelay: '100ms' }}>
              <div className="flex flex-wrap gap-2">
                {TOP_SKILLS.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#17191E] border border-[#292C32] text-[#A1A1AA] hover:border-[#D6AD63]/50 hover:text-[#D6AD63] transition-colors"
                  >
                    {skill}
                  </span>
                ))}
                <Link
                  to="/about"
                  className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#D6AD63]/10 border border-[#D6AD63]/30 text-[#D6AD63] hover:bg-[#D6AD63]/20 transition-colors"
                >
                  + more skills →
                </Link>
              </div>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* ── Contact Preview ───────────────────────────────────────── */}
      <section
        aria-labelledby="home-contact-heading"
        className="section-spacing bg-[#17191E] border-b border-[#292C32]"
      >
        <div className="container-custom">
          <RevealDiv className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6AD63]" />
              <span className="mono-caps text-[#D6AD63]">Get in Touch</span>
            </div>
            <h2
              id="home-contact-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-[#F2F0EB] tracking-tight mb-4"
            >
              Let's Build Something Together
            </h2>
            <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed mb-8">
              Open to project-based, freelance, part-time, or full-time remote roles. Reach out through any channel below.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
              <a
                href={`mailto:${profile.contact.email}`}
                className="inline-flex items-center gap-2 text-sm font-mono text-[#D6AD63] hover:text-[#E5BE75] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                {profile.contact.email}
              </a>
              <span className="text-[#292C32] hidden sm:block">|</span>
              <a
                href={`tel:${profile.contact.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 text-sm font-mono text-[#A1A1AA] hover:text-[#F2F0EB] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.4 2 2 0 0 1 3.59 2.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.1 6.1l.9-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.72 17.4l.2-.48z" />
                </svg>
                {profile.contact.phone}
              </a>
            </div>

            <Link to="/contact" className="btn-gold-primary border-beam inline-flex items-center gap-2 text-sm py-2.5 px-7">
              Open Contact Page
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </RevealDiv>
        </div>
      </section>
    </>
  );
}
