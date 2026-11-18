import { profile } from '../data/profile';
import { projects } from '../data/projects';

export default function Hero() {
  const handleScroll = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="main-content"
      aria-label="Introduction"
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden border-b border-[#292C32] bg-[#101114] py-20 lg:py-28"
    >
      {/* ─── Cinematic Ambient Lighting & Background Elements ───────── */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#D6AD63]/10 rounded-full blur-[140px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -top-10 right-10 w-[350px] h-[350px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-10 w-[400px] h-[300px] bg-emerald-500/5 rounded-full blur-[130px] pointer-events-none"
      />

      {/* Grid Mesh Overlay with subtle fade mask */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.14] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #292C32 1px, transparent 1px), linear-gradient(to bottom, #292C32 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 80%)',
        }}
      />

      {/* ─── Hero Content ───────────────────────────────────────────── */}
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center lg:text-left">
          
          {/* Eyebrow: Live Radar Availability Pill */}
          <div className="anim-fade-up anim-delay-1 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#17191E] border border-[#292C32] shadow-inner mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="font-mono text-xs text-[#A1A1AA] tracking-wide">
              {profile.identity.availability}
            </span>
          </div>

          {/* Main Display Title */}
          <h1 className="anim-fade-up anim-delay-2 font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F2F0EB] leading-[1.08] mb-6">
            Architecting &amp; Deploying{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D6AD63] via-[#F3DEAB] to-[#D6AD63]">
              Production Systems
            </span>
          </h1>

          {/* Role & Positioning Statement */}
          <div className="anim-fade-up anim-delay-3 flex flex-col gap-3 max-w-2xl mb-8 mx-auto lg:mx-0">
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <span className="font-mono text-sm uppercase tracking-wider text-[#D6AD63] font-semibold">
                Anthony Riel C. Diango
              </span>
              <span className="text-[#292C32]">•</span>
              <span className="text-sm text-[#A1A1AA]">
                Full-Stack Web Developer &amp; Technical Support
              </span>
            </div>
            <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
              {profile.identity.summary}
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="anim-fade-up anim-delay-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-14">
            <a
              href="#work"
              onClick={(e) => handleScroll(e, '#work')}
              className="btn-gold-primary group text-sm sm:text-base font-semibold px-6 py-3.5"
            >
              <span>Explore 16 Deployments</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-y-0.5"
              >
                <path d="M7 13l5 5 5-5M12 6v12" />
              </svg>
            </a>

            <a
              href="#contact"
              onClick={(e) => handleScroll(e, '#contact')}
              className="btn-dark-outline text-sm sm:text-base px-6 py-3.5"
            >
              <span>Discuss a Project</span>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

          {/* ─── Production Metrics Strip ───────────────────────────── */}
          <div className="anim-fade-up anim-delay-5 pt-8 border-t border-[#292C32]/80 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
            <div className="flex flex-col">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-[#F2F0EB]">
                16<span className="text-[#D6AD63]">+</span>
              </span>
              <span className="font-mono text-xs uppercase text-[#A1A1AA] tracking-wider mt-1">
                Live Deployed Apps
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-[#F2F0EB]">
                10<span className="text-[#D6AD63]">+</span>
              </span>
              <span className="font-mono text-xs uppercase text-[#A1A1AA] tracking-wider mt-1">
                Years IT &amp; Database Ops
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-[#F2F0EB]">
                4
              </span>
              <span className="font-mono text-xs uppercase text-[#A1A1AA] tracking-wider mt-1">
                Core Domains
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-mono text-sm sm:text-base font-semibold text-[#F2F0EB] truncate">
                Bohol, Philippines
              </span>
              <span className="font-mono text-xs uppercase text-[#A1A1AA] tracking-wider mt-1">
                Guinacot, Guindulman
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
