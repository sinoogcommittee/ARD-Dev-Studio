import { profile } from '../data/profile';
import ParticleCanvas from './ParticleCanvas';
import Counter from './Counter';
import { useMagnetic } from '../hooks/useMagnetic';
import { useMouseTilt } from '../hooks/useMouseTilt';

export default function Hero({ currentStatus }) {
  const { ref: btnPrimaryRef, style: btnPrimaryStyle } = useMagnetic(0.25);
  const { ref: btnOutlineRef, style: btnOutlineStyle } = useMagnetic(0.2);
  const { ref: emblemRef, tiltStyle: emblemTiltStyle, spotlightPos: emblemSpotlight } = useMouseTilt(7);

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
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden border-b border-[#292C32] bg-[#101114] py-16 lg:py-24"
    >
      {/* ─── Interactive Background Particle Canvas ─────────────────── */}
      <ParticleCanvas />

      {/* ─── Cinematic Ambient Lighting & Background Elements ───────── */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#D6AD63]/10 rounded-full blur-[140px] pointer-events-none"
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
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Bio & CTAs (Follows art on mobile/tablet, left column on desktop) */}
          <div className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1 pt-4 pb-16 lg:py-0">
            
            {/* Main Display Title */}
            <h1 className="anim-fade-up anim-delay-1 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F2F0EB] leading-[1.1] mb-6">
              Architecting &amp; Deploying{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D6AD63] via-[#F3DEAB] to-[#D6AD63]">
                Production Systems
              </span>
            </h1>

            {/* Role & Positioning Statement */}
            <div className="anim-fade-up anim-delay-2 flex flex-col gap-3 max-w-2xl mb-8 mx-auto lg:mx-0">
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <span className="font-mono text-sm uppercase tracking-wider text-[#D6AD63] font-semibold">
                  ARD Dev Studio
                </span>
                <span className="text-[#292C32]">•</span>
                <span className="text-sm text-[#A1A1AA]">
                  Anthony Riel C. Diango
                </span>
              </div>
              <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
                {profile.identity.summary}
              </p>
            </div>

            {/* Primary Action Buttons with Magnetic Physics */}
            <div className="anim-fade-up anim-delay-3 flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-12">
              <div ref={btnPrimaryRef} style={btnPrimaryStyle}>
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
              </div>

              <div ref={btnOutlineRef} style={btnOutlineStyle}>
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
            </div>

            {/* Production Metrics Strip with Animated Counters */}
            <div className="anim-fade-up anim-delay-4 pt-6 border-t border-[#292C32]/80 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
              <div className="flex flex-col">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-[#F2F0EB]">
                  <Counter end={16} suffix="+" />
                </span>
                <span className="font-mono text-xs uppercase text-[#A1A1AA] tracking-wider mt-1">
                  Live Deployed Apps
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-[#F2F0EB]">
                  <Counter end={10} suffix="+" />
                </span>
                <span className="font-mono text-xs uppercase text-[#A1A1AA] tracking-wider mt-1">
                  Years IT &amp; Database Ops
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-[#F2F0EB]">
                  <Counter end={4} />
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

          {/* Right Column: 3D Holographic Brand Emblem Card (First full-screen view on mobile/tablet portrait, right column on desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-center items-center lg:items-end order-1 lg:order-2 min-h-[calc(100svh-4.5rem)] lg:min-h-0 py-6 lg:py-0 anim-fade-up anim-delay-1">
            <div
              ref={emblemRef}
              style={emblemTiltStyle}
              className="relative w-full max-w-sm sm:max-w-md rounded-2xl bg-[#17191E]/90 border border-[#292C32] p-5 sm:p-6 shadow-2xl backdrop-blur-xl group hover:border-[#D6AD63]/60 transition-colors"
            >
              {/* Cursor Spotlight on Emblem */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-200"
                style={{
                  opacity: emblemSpotlight.opacity,
                  background: `radial-gradient(circle 260px at ${emblemSpotlight.x}% ${emblemSpotlight.y}%, rgba(214, 173, 99, 0.18), transparent 70%)`,
                }}
              />

              {/* Blueprint Corner Registration Crosshairs */}
              <div className="absolute top-2.5 left-2.5 font-mono text-xs text-[#D6AD63]/50 select-none">+</div>
              <div className="absolute top-2.5 right-2.5 font-mono text-xs text-[#D6AD63]/50 select-none">+</div>
              <div className="absolute bottom-2.5 left-2.5 font-mono text-xs text-[#D6AD63]/50 select-none">+</div>
              <div className="absolute bottom-2.5 right-2.5 font-mono text-xs text-[#D6AD63]/50 select-none">+</div>

              {/* Telemetry Header */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#292C32]/70 text-[11px] font-mono">
                <span className="text-[#D6AD63] flex items-center gap-1.5 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D6AD63] animate-pulse" />
                  ARD DEV STUDIO // SEAL
                </span>
                <span className="text-[#71717A]">SYS_REV // 2026</span>
              </div>

              {/* Insignia Image Container */}
              <div className="relative rounded-xl overflow-hidden border border-[#292C32]/80 bg-[#101114] aspect-[16/10] flex items-center justify-center group-hover:shadow-[0_0_30px_rgba(214,173,99,0.2)] transition-shadow">
                <img
                  src="/images/logodesign.jpg"
                  alt="ARD Dev Studio 3D Gold Insignia Blueprint"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Subtle glass reflection gradient */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none"
                />
              </div>

              {/* Telemetry Footer */}
              <div className="pt-4 mt-4 border-t border-[#292C32]/70 flex items-center justify-between text-[11px] font-mono text-[#A1A1AA]">
                <div>
                  <span className="text-[#71717A] block text-[9px] uppercase">Studio &amp; Engineering</span>
                  <span className="text-[#F2F0EB] font-semibold">ARD Dev Studio</span>
                </div>
                <div className="text-right">
                  <span className="text-[#71717A] block text-[9px] uppercase">Lead Engineer</span>
                  <span className="text-[#D6AD63]">Anthony Riel Diango</span>
                </div>
              </div>
            </div>

            {/* Scroll Indicator Cue (mobile & tablet portrait only) */}
            <div className="lg:hidden mt-8 flex flex-col items-center gap-1.5 text-xs font-mono text-[#D6AD63] animate-bounce select-none">
              <span className="tracking-wider uppercase text-[10px] font-semibold">Scroll to Explore</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
