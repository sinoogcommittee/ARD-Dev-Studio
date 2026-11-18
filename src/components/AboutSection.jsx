import { profile } from '../data/profile';
import { RevealDiv } from '../hooks/useScrollReveal';

const SKILL_CATEGORIES = [
  {
    title: 'Frontend Development',
    items: profile.skills.frontend,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    ),
  },
  {
    title: 'Backend & Languages',
    items: profile.skills.backendAndLanguages,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
  },
  {
    title: 'Cloud, Hosting & Integrations',
    items: profile.skills.hostingAndIntegrations,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
      </svg>
    ),
  },
  {
    title: 'Systems & Infrastructure',
    items: profile.skills.systems,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
        <line x1="6" y1="6" x2="6.01" y2="6"></line>
        <line x1="6" y1="18" x2="6.01" y2="18"></line>
      </svg>
    ),
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section-spacing bg-[#101114] border-b border-[#292C32] relative overflow-hidden"
    >
      {/* Background glow accent */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#D6AD63]/5 rounded-full blur-[150px] pointer-events-none"
      />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <RevealDiv className="mb-14 max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6AD63]" />
            <span className="mono-caps text-[#D6AD63]">Background &amp; Expertise</span>
          </div>
          <h2
            id="about-heading"
            className="font-display text-3xl sm:text-5xl font-bold text-[#F2F0EB] tracking-tight mb-4"
          >
            Engineering Foundation &amp; Technical Capabilities
          </h2>
          <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
            {profile.identity.developerSummary}
          </p>
        </RevealDiv>

        {/* ─── Technical Skills Grid ─────────────────────────────────── */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#292C32]">
            <h3 className="font-display text-xl font-bold text-[#F2F0EB]">
              Technical Stack &amp; Specializations
            </h3>
            <span className="font-mono text-xs text-[#D6AD63]">
              Verified Capabilities
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKILL_CATEGORIES.map(({ title, items, icon }, index) => (
              <RevealDiv
                key={title}
                delay={index * 60}
                className="p-6 rounded-lg bg-[#17191E] border border-[#292C32] hover:border-[#D6AD63]/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#1E2127] border border-[#292C32] flex items-center justify-center text-[#D6AD63] mb-4">
                    {icon}
                  </div>
                  <h4 className="font-display font-bold text-base text-[#F2F0EB] mb-4">
                    {title}
                  </h4>
                  <ul className="flex flex-col gap-2 p-0 m-0 list-none">
                    {items.map((skill) => (
                      <li
                        key={skill}
                        className="text-xs text-[#A1A1AA] flex items-start gap-2 leading-relaxed"
                      >
                        <span className="text-[#D6AD63] mt-1 text-[10px]">▹</span>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealDiv>
            ))}
          </div>

          {/* AI-Assisted Engineering Callout */}
          <RevealDiv delay={100} className="mt-6 p-4 rounded-lg bg-[#17191E]/70 border border-[#292C32] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#D6AD63] uppercase tracking-wider font-semibold">
                AI-Assisted Engineering Workflows:
              </span>
              <div className="flex flex-wrap gap-2">
                {profile.skills.aiAssistedWorkflows.map((tool) => (
                  <span key={tool} className="tech-chip text-[#D6AD63] border-[#D6AD63]/30">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <span className="font-mono text-[11px] text-[#71717A]">
              Accelerated delivery, rigorous testing &amp; architecture modeling
            </span>
          </RevealDiv>
        </div>

        {/* ─── Experience Timeline ───────────────────────────────────── */}
        <div id="experience" className="pt-6">
          <div className="flex items-center justify-between mb-10 pb-3 border-b border-[#292C32]">
            <h3 className="font-display text-2xl font-bold text-[#F2F0EB]">
              Professional Experience
            </h3>
            <span className="font-mono text-xs text-[#A1A1AA]">
              Chronological Record
            </span>
          </div>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-[#292C32] space-y-12">
            {profile.experience.map((exp, index) => (
              <RevealDiv key={index} delay={index * 70} className="relative group">
                {/* Glowing beacon dot on timeline */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#101114] border-2 border-[#D6AD63] group-hover:scale-125 transition-transform flex items-center justify-center shadow-md">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D6AD63]" />
                </div>

                <div className="p-6 rounded-lg bg-[#17191E] border border-[#292C32] group-hover:border-[#D6AD63]/50 transition-all duration-300 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-semibold text-[#D6AD63] tracking-wide">
                      {exp.period}
                    </span>
                    <span className="font-mono text-[11px] text-[#71717A]">
                      {exp.location}
                    </span>
                  </div>

                  <h4 className="font-display text-lg sm:text-xl font-bold text-[#F2F0EB] mb-1">
                    {exp.role}
                  </h4>

                  <p className="font-mono text-xs text-[#A1A1AA] mb-4">
                    {exp.organization}
                  </p>

                  <p className="text-sm text-[#A1A1AA] leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>

        {/* ─── Education & Official Credentials ──────────────────────── */}
        <div className="mt-20 pt-12 border-t border-[#292C32]">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#292C32]">
            <h3 className="font-display text-2xl font-bold text-[#F2F0EB]">
              Education &amp; Credentials
            </h3>
            <span className="font-mono text-xs text-[#D6AD63]">
              Accredited Qualifications
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Academic Degrees */}
            <RevealDiv className="p-6 rounded-lg bg-[#17191E] border border-[#292C32]">
              <h4 className="font-mono text-xs uppercase tracking-wider text-[#D6AD63] font-bold mb-4">
                Academic Degrees
              </h4>
              <div className="space-y-6">
                {profile.educationAndCredentials.degrees.map((deg, i) => (
                  <div key={i} className="border-l-2 border-[#D6AD63]/60 pl-4">
                    <p className="font-display font-bold text-base text-[#F2F0EB]">
                      {deg.degree}
                    </p>
                    <p className="text-xs text-[#A1A1AA] mt-0.5">
                      {deg.institution}
                    </p>
                    <span className="font-mono text-[11px] text-[#D6AD63] mt-1 inline-block">
                      {deg.period}
                    </span>
                  </div>
                ))}
              </div>
            </RevealDiv>

            {/* Certifications & Eligibilities */}
            <RevealDiv delay={80} className="p-6 rounded-lg bg-[#17191E] border border-[#292C32]">
              <h4 className="font-mono text-xs uppercase tracking-wider text-[#D6AD63] font-bold mb-4">
                Certifications &amp; Professional Licensure
              </h4>
              <ul className="space-y-3.5 m-0 p-0 list-none">
                {profile.educationAndCredentials.credentials.map((cred) => (
                  <li
                    key={cred}
                    className="flex items-start gap-3 text-sm text-[#F2F0EB]"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#D6AD63]/10 border border-[#D6AD63]/30 text-[#D6AD63] flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">
                      ✓
                    </span>
                    <span className="text-sm text-[#A1A1AA] leading-snug">
                      {cred}
                    </span>
                  </li>
                ))}
              </ul>
            </RevealDiv>
          </div>
        </div>

      </div>
    </section>
  );
}
