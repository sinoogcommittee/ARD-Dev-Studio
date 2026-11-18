import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { profile } from '../data/profile';
import Counter from './Counter';
import HeroBlueprintCanvas from './motion/HeroBlueprintCanvas';
import HeroCenterpiece from './motion/HeroCenterpiece';
import { useMagnetic } from '../hooks/useMagnetic';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useScrambleText } from '../hooks/useScrambleText';

const SYSTEM_DOMAINS = [
  'Civic Portals',
  'Athletic Scoring Engines',
  'School MIS',
  'Clinic Management',
  'Event Hubs',
];
const SPECIALTIES = [
  'Production Systems',
  'Civic & LGU Portals',
  'Live Scoring Engines',
  'School & Clinic Apps',
];
const EYEBROW = 'ANTHONY RIEL C. DIANGO · FULL-STACK WEB DEVELOPER';
const GsapHeroParallax = lazy(() => import('./motion/GsapHeroParallax'));

export default function Hero() {
  const heroRef = useRef(null);
  const centerpieceRef = useRef(null);
  const [specialtyIndex, setSpecialtyIndex] = useState(0);
  const reduced = useReducedMotion();
  const eyebrow = useScrambleText(EYEBROW);
  const { ref: primaryRef, style: primaryStyle } = useMagnetic(0.12);
  const { ref: secondaryRef, style: secondaryStyle } = useMagnetic(0.12);
  const [enableDesktopParallax, setEnableDesktopParallax] = useState(false);

  useEffect(() => {
    if (reduced) {
      setSpecialtyIndex(0);
      return undefined;
    }
    const timer = window.setInterval(() => {
      setSpecialtyIndex((current) => (current + 1) % SPECIALTIES.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [reduced]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const update = () => setEnableDesktopParallax(!reduced && desktop.matches);
    update();
    desktop.addEventListener?.('change', update);
    return () => desktop.removeEventListener?.('change', update);
  }, [reduced]);

  const scrollTo = (href) => (event) => {
    event.preventDefault();
    const behavior = reduced ? 'auto' : 'smooth';
    document.querySelector(href)?.scrollIntoView({ behavior, block: 'start' });
  };

  return (
    <section
      id="main-content"
      ref={heroRef}
      aria-label="Introduction"
      className="hero-shell relative flex items-center overflow-hidden border-b border-[#292C32] bg-[#101114]"
    >
      <HeroBlueprintCanvas />
      {enableDesktopParallax && (
        <Suspense fallback={null}>
          <GsapHeroParallax heroRef={heroRef} centerpieceRef={centerpieceRef} />
        </Suspense>
      )}

      <div className="container-custom hero-layout-container relative z-10 w-full">
        <div className="hero-layout-grid">
          <div ref={centerpieceRef} className="hero-art-column">
            <HeroCenterpiece />
          </div>

          <div className="hero-copy">
            <div className="hero-eyebrow" aria-label={EYEBROW}>
              <span className="hero-eyebrow-line" />
              <span className="hero-eyebrow-text" aria-hidden="true">{eyebrow}</span>
            </div>

            <h1 className="hero-title font-display font-bold tracking-tight text-[#F2F0EB]">
              <span className="hero-title-line"><span>Architecting &amp; Deploying</span></span>
              <span className="hero-title-line specialty-mask">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={SPECIALTIES[specialtyIndex]}
                    className="hero-title-accent"
                    initial={reduced ? false : { y: '110%', rotateX: -65, opacity: 0 }}
                    animate={{ y: '0%', rotateX: 0, opacity: 1 }}
                    exit={reduced ? undefined : { y: '-110%', rotateX: 65, opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.58, ease: [0.16, 1, 0.3, 1] }}
                    aria-live="off"
                  >
                    {SPECIALTIES[specialtyIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            <p className="hero-description">
              {profile.identity.summary}
            </p>

            <div className="hero-actions">
              <motion.div ref={primaryRef} style={primaryStyle} className="magnetic-wrap">
                <a href="#work" aria-label="Explore 16 Deployments" onClick={scrollTo('#work')} className="btn-gold-primary hero-cta border-beam">
                  <span className="hero-cta-label-full">Explore 16 Deployments</span>
                  <span className="hero-cta-label-compact" aria-hidden="true">Explore Work</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 13l5 5 5-5M12 6v12" />
                  </svg>
                </a>
              </motion.div>
              <motion.div ref={secondaryRef} style={secondaryStyle} className="magnetic-wrap">
                <a href="#contact" aria-label="Discuss a Project" onClick={scrollTo('#contact')} className="btn-dark-outline hero-cta border-beam">
                  <span className="hero-cta-label-full">Discuss a Project</span>
                  <span className="hero-cta-label-compact" aria-hidden="true">Discuss Project</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </motion.div>
            </div>

            <div className="hero-metrics" aria-label="Professional highlights">
              <div className="metric-item"><strong><Counter end={16} suffix="+" /></strong><span>Live Deployed Apps</span></div>
              <div className="metric-item"><strong><Counter end={10} suffix="+" /></strong><span>Years in IT</span></div>
              <div className="metric-item"><strong><Counter end={4} /></strong><span>Core Domains</span></div>
              <div className="metric-item metric-location"><strong>Bohol, Philippines</strong><span>Guinacot, Guindulman</span></div>
            </div>
          </div>
        </div>

        <div className="domain-marquee" aria-label="Project domains">
          <span className="marquee-label">SYSTEMS ACROSS</span>
          <div className="marquee-window">
            <div className="marquee-track">
              {[...SYSTEM_DOMAINS, ...SYSTEM_DOMAINS].map((domain, index) => (
                <span className="marquee-item" key={`${domain}-${index}`}><i aria-hidden="true" />{domain}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
