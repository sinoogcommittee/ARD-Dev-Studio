import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import { projects } from '../data/projects';
import { profile } from '../data/profile';
import { RevealDiv } from '../hooks/useScrollReveal';
import { SKILL_META_MAP } from '../components/skillIcons';

// 4 Highlight Projects with preview screenshots
const HIGHLIGHT_IDS = [
  'bohol-meet-scoring-system',
  'carls-fried',
  'sinoog-2027-event-hub',
  'suroy-guindulman',
];
const HIGHLIGHT_PROJECTS = HIGHLIGHT_IDS
  .map((id) => projects.find((p) => p.id === id))
  .filter(Boolean);

// Key verified skills to display as icon logos (not text) on the Home Page
const HOME_SKILLS = [
  SKILL_META_MAP['React'],
  SKILL_META_MAP['Tailwind CSS'],
  SKILL_META_MAP['JavaScript (ES6+, DOM, Fetch API)'],
  SKILL_META_MAP['HTML5'],
  SKILL_META_MAP['CSS3'],
  SKILL_META_MAP['Supabase (PostgreSQL, Auth, Row-Level Security, Storage)'],
  SKILL_META_MAP['ASP.NET Core MVC'],
  SKILL_META_MAP['C#'],
  SKILL_META_MAP['Java (Spring Boot, JavaFX, Swing)'],
  SKILL_META_MAP['Python'],
  SKILL_META_MAP['C/C++'],
  SKILL_META_MAP['Render'],
  SKILL_META_MAP['Vercel'],
  SKILL_META_MAP['Cloudflare R2 media optimization'],
  SKILL_META_MAP['REST APIs'],
  SKILL_META_MAP['Database architecture and MIS administration'],
  SKILL_META_MAP['VS Code'],
  SKILL_META_MAP['Google Antigravity'],
].filter(Boolean);

export default function HomePage({ currentStatus }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [announcement, setAnnouncement] = useState('');
  const carouselRef = useRef(null);
  const pendingTargetRef = useRef(null);
  const lastSettledRef = useRef(0);
  const rafRef = useRef(null);
  const settleTimerRef = useRef(null);

  const computeNearestSlide = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return 0;
    const slides = el.children;
    if (!slides || slides.length === 0) return 0;
    const trackCenter = el.scrollLeft + el.clientWidth / 2;
    let nearest = 0;
    let minDist = Infinity;
    for (let i = 0; i < slides.length; i += 1) {
      const slideCenter = slides[i].offsetLeft + slides[i].offsetWidth / 2;
      const dist = Math.abs(slideCenter - trackCenter);
      if (dist < minDist) {
        minDist = dist;
        nearest = i;
      }
    }
    return nearest;
  }, []);

  const handleSettle = useCallback(() => {
    const settled = computeNearestSlide();
    pendingTargetRef.current = null;
    setActiveSlide(settled);
    if (settled !== lastSettledRef.current) {
      lastSettledRef.current = settled;
      const item = HIGHLIGHT_PROJECTS[settled];
      if (item) {
        setAnnouncement(`Slide ${settled + 1} of ${HIGHLIGHT_PROJECTS.length}: ${item.title}`);
      }
    }
  }, [computeNearestSlide]);

  // Sync active slide on native horizontal touch / swipe with rAF throttling
  const handleScroll = useCallback(() => {
    if (pendingTargetRef.current !== null) {
      if (!('onscrollend' in window)) {
        window.clearTimeout(settleTimerRef.current);
        settleTimerRef.current = window.setTimeout(handleSettle, 140);
      }
      return;
    }

    if (rafRef.current) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      const nearest = computeNearestSlide();
      setActiveSlide((prev) => (prev !== nearest ? nearest : prev));
    });

    if (!('onscrollend' in window)) {
      window.clearTimeout(settleTimerRef.current);
      settleTimerRef.current = window.setTimeout(handleSettle, 140);
    }
  }, [computeNearestSlide, handleSettle]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el || !('onscrollend' in window)) return undefined;
    el.addEventListener('scrollend', handleSettle, { passive: true });
    return () => el.removeEventListener('scrollend', handleSettle);
  }, [handleSettle]);

  useEffect(() => () => {
    if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    if (settleTimerRef.current) window.clearTimeout(settleTimerRef.current);
  }, []);

  const scrollToSlide = (index) => {
    const el = carouselRef.current;
    if (!el) return;
    const slides = el.children;
    const targetSlide = slides?.[index];
    if (!targetSlide) return;

    pendingTargetRef.current = index;
    setActiveSlide(index);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const delta = targetSlide.offsetLeft - el.scrollLeft;
    el.scrollBy({
      left: delta,
      behavior: reduced ? 'auto' : 'smooth',
    });

    if (reduced) {
      handleSettle();
    } else if (!('onscrollend' in window)) {
      window.clearTimeout(settleTimerRef.current);
      settleTimerRef.current = window.setTimeout(handleSettle, 220);
    }
  };

  const handlePrev = () => {
    const base = pendingTargetRef.current ?? activeSlide;
    const prevIndex = (base - 1 + HIGHLIGHT_PROJECTS.length) % HIGHLIGHT_PROJECTS.length;
    scrollToSlide(prevIndex);
  };

  const handleNext = () => {
    const base = pendingTargetRef.current ?? activeSlide;
    const nextIndex = (base + 1) % HIGHLIGHT_PROJECTS.length;
    scrollToSlide(nextIndex);
  };

  return (
    <>
      {/* ── Hero (preserved exactly) ──────────────────────────────── */}
      <Hero currentStatus={currentStatus} />

      {/* ── Highlight Production Systems Preview ──────────────────── */}
      <section
        aria-labelledby="home-projects-heading"
        className="section-spacing bg-[#17191E] border-b border-[#292C32] relative overflow-hidden"
      >
        {/* Ambient Glow */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#D6AD63]/5 rounded-full blur-[140px] pointer-events-none"
        />

        <div className="container-custom relative z-10">
          <RevealDiv className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6AD63]" />
              <span className="mono-caps text-[#D6AD63]">Featured Highlight Projects</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h2
                  id="home-projects-heading"
                  className="font-display text-3xl sm:text-4xl font-bold text-[#F2F0EB] tracking-tight"
                >
                  Highlight Production Systems
                </h2>
                <p className="text-sm text-[#A1A1AA] mt-1 max-w-xl">
                  Flagship full-stack deployments with active real-world operations across scoring, municipal tourism, and commercial SaaS.
                </p>
              </div>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-sm font-mono text-[#D6AD63] hover:text-[#E5BE75] transition-colors group shrink-0"
              >
                View all {projects.length} projects
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

          {/* ── Desktop & Tablet View (Balanced 2x2 Showcase of 4 Highlight Projects) ── */}
          <div className="hidden sm:grid sm:grid-cols-2 gap-6">
            {HIGHLIGHT_PROJECTS.map((project, i) => (
              <RevealDiv key={project.id} style={{ transitionDelay: `${i * 80}ms` }} className="h-full">
                <div className="group flex flex-col justify-between h-full bg-[#101114] border border-[#292C32] rounded-xl p-5 sm:p-6 hover:border-[#D6AD63]/60 hover:shadow-[0_0_28px_rgba(214,173,99,0.12)] transition-all duration-300">
                  <div>
                    {/* Full Screenshot Preview (100% visible, no clipping) */}
                    {project.previewImage && (
                      <div className="relative w-full aspect-video bg-[#090A0D] border border-[#292C32] rounded-lg overflow-hidden mb-4 group-hover:border-[#D6AD63]/50 transition-colors flex items-center justify-center shadow-inner">
                        <img
                          src={project.previewImage}
                          alt={`${project.title} live interface preview`}
                          loading="lazy"
                          className="w-full h-full object-contain rounded"
                        />
                      </div>
                    )}

                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#D6AD63] bg-[#D6AD63]/10 px-2 py-0.5 rounded">
                        {project.category.split(',')[0].trim()}
                      </span>
                      <span className="font-mono text-[10px] text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Live
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-[#F2F0EB] mb-2 group-hover:text-[#D6AD63] transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.stack.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#17191E] border border-[#292C32] text-[#A1A1AA]">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-[#292C32]/80 flex items-center justify-between">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#D6AD63] hover:text-[#E5BE75] transition-colors"
                        aria-label={`Launch ${project.title} live site`}
                      >
                        <span>Launch Site</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </a>
                      <Link
                        to="/projects"
                        className="text-[11px] font-mono text-[#71717A] hover:text-[#F2F0EB] transition-colors"
                      >
                        Details →
                      </Link>
                    </div>
                  </div>
                </div>
              </RevealDiv>
            ))}
          </div>

          {/* ── Mobile View: 1 Card View with Touch Swipe (Carousel) ── */}
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Highlight projects"
            className="sm:hidden"
          >
            <div
              ref={carouselRef}
              onScroll={handleScroll}
              tabIndex={0}
              role="group"
              aria-label="Slides"
              className="highlight-carousel-track focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6AD63] rounded-xl"
            >
              {HIGHLIGHT_PROJECTS.map((project, idx) => (
                <div
                  key={project.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${idx + 1} of ${HIGHLIGHT_PROJECTS.length}: ${project.title}`}
                  className="w-full flex-shrink-0 snap-center"
                >
                  <div className="bg-[#101114] border border-[#292C32] rounded-xl p-4 shadow-lg">
                    {/* Full Screenshot Preview (100% visible, no clipping) */}
                    {project.previewImage && (
                      <div className="relative w-full aspect-video bg-[#090A0D] border border-[#292C32] rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                        <img
                          src={project.previewImage}
                          alt={`${project.title} live interface preview`}
                          loading="lazy"
                          className="w-full h-full object-contain rounded"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#D6AD63] bg-[#D6AD63]/10 px-2 py-0.5 rounded">
                        {project.category.split(',')[0].trim()}
                      </span>
                      <span className="font-mono text-[10px] text-[#A1A1AA]">
                        {idx + 1} / {HIGHLIGHT_PROJECTS.length}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-[#F2F0EB] mb-2">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.stack.map((tech) => (
                        <span key={tech} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#17191E] border border-[#292C32] text-[#D6AD63]">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-[#292C32] flex items-center justify-between">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#D6AD63]"
                      >
                        Launch Live Site ↗
                      </a>
                      <Link
                        to="/projects"
                        className="text-xs font-mono text-[#71717A]"
                      >
                        Inspect →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="sr-only" role="status" aria-live="polite">
              {announcement}
            </p>

            {/* Carousel Controls & Pagination Markers */}
            <div className="flex items-center justify-between mt-3 px-1">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous highlight project"
                className="w-9 h-9 rounded-lg bg-[#101114] border border-[#292C32] text-[#F2F0EB] hover:border-[#D6AD63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6AD63] flex items-center justify-center transition-colors touch-manipulation"
              >
                ←
              </button>

              <nav aria-label="Choose a slide" className="flex items-center gap-1">
                {HIGHLIGHT_PROJECTS.map((project, i) => {
                  const isCurrent = activeSlide === i;
                  return (
                    <button
                      key={project.id}
                      type="button"
                      aria-current={isCurrent ? 'true' : undefined}
                      aria-label={`Go to slide ${i + 1}: ${project.title}`}
                      onClick={() => scrollToSlide(i)}
                      className="min-w-[24px] min-h-[24px] p-1.5 flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6AD63] touch-manipulation cursor-pointer"
                    >
                      <span
                        aria-hidden="true"
                        className={`block h-2 rounded-full transition-all duration-300 ${
                          isCurrent
                            ? 'w-6 bg-[#D6AD63] ring-1 ring-[#F3DEAB]/60'
                            : 'w-2 bg-[#3F434D] hover:bg-[#71717A]'
                        }`}
                      />
                    </button>
                  );
                })}
              </nav>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next highlight project"
                className="w-9 h-9 rounded-lg bg-[#101114] border border-[#292C32] text-[#F2F0EB] hover:border-[#D6AD63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6AD63] flex items-center justify-center transition-colors touch-manipulation"
              >
                →
              </button>
            </div>
          </div>

          {/* ── Below the highlights: Explore All Projects CTA ────── */}
          <RevealDiv className="mt-10 text-center">
            <Link
              to="/projects"
              className="btn-gold-primary border-beam inline-flex items-center gap-2 text-sm py-2.5 px-7"
            >
              Explore All Projects
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </RevealDiv>
        </div>
      </section>

      {/* ── About & Skills Preview ────────────────────────────────── */}
      <section
        aria-labelledby="home-about-heading"
        className="section-spacing bg-[#101114] border-b border-[#292C32] relative overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="absolute top-1/2 right-0 w-[450px] h-[450px] bg-[#D6AD63]/5 rounded-full blur-[140px] pointer-events-none"
        />

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Developer Profile Copy */}
            <RevealDiv className="lg:col-span-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D6AD63]" />
                <span className="mono-caps text-[#D6AD63]">Developer Profile &amp; Stack</span>
              </div>
              <h2
                id="home-about-heading"
                className="font-display text-3xl sm:text-4xl font-bold text-[#F2F0EB] tracking-tight mb-5"
              >
                Core Technologies &amp; Capabilities
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
                View full profile, skills &amp; experience
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

            {/* Right Column: Verified Skill Logos (Visual Icon Dock, No Written Text) */}
            <RevealDiv style={{ transitionDelay: '100ms' }} className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#17191E] border border-[#292C32] shadow-xl">
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#292C32]/70">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#D6AD63] font-semibold">
                    Technical Stack
                  </span>
                  <span className="font-mono text-[11px] text-[#71717A]">
                    Click any logo to explore skills
                  </span>
                </div>

                {/* Grid of Skill Logos - Balanced 3x6 Mobile / 6x3 Desktop, Logos Only */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-3.5">
                  {HOME_SKILLS.map((skill) => {
                    const IconComponent = skill.Icon;
                    return (
                      <Link
                        key={skill.name}
                        to="/about"
                        aria-label={`${skill.name} — view full skills on About page`}
                        className="group/skill relative flex items-center justify-center aspect-[4/3] sm:aspect-square rounded-xl bg-[#101114] border border-[#292C32] hover:border-[#D6AD63] hover:shadow-[0_0_20px_rgba(214,173,99,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6AD63] transition-all duration-300 p-3"
                      >
                        <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center transition-transform duration-300 group-hover/skill:scale-110">
                          <IconComponent className="w-full h-full object-contain" aria-hidden="true" />
                        </div>

                        {/* Floating Tooltip on hover / focus */}
                        <div
                          role="tooltip"
                          className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-[#1C1E24] border border-[#D6AD63]/40 text-[#F2F0EB] text-[11px] font-mono whitespace-nowrap opacity-0 group-hover/skill:opacity-100 group-focus-visible/skill:opacity-100 transition-opacity duration-200 z-30 shadow-lg"
                        >
                          {skill.name}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 bg-[#1C1E24] border-r border-b border-[#D6AD63]/40 -mt-0.5" />
                        </div>
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-6 pt-4 border-t border-[#292C32]/70 flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] text-[#71717A]">
                    Frontend · Backend · Cloud · Systems
                  </span>
                  <Link
                    to="/about"
                    className="text-xs font-mono text-[#D6AD63] hover:text-[#E5BE75] transition-colors shrink-0"
                  >
                    View All Skills →
                  </Link>
                </div>
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
