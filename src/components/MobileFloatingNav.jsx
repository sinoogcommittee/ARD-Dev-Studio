import { useState, useEffect, useRef } from 'react';

const NAV_ITEMS = [
  {
    id: 'work',
    href: '#work',
    label: 'Projects',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"></rect>
        <rect x="14" y="3" width="7" height="7"></rect>
        <rect x="14" y="14" width="7" height="7"></rect>
        <rect x="3" y="14" width="7" height="7"></rect>
      </svg>
    ),
  },
  {
    id: 'about',
    href: '#about',
    label: 'About',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
  },
  {
    id: 'experience',
    href: '#experience',
    label: 'Experience',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    ),
  },
  {
    id: 'contact',
    href: '#contact',
    label: 'Contact',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    ),
  },
];

export default function MobileFloatingNav() {
  const [activeSection, setActiveSection] = useState('work');
  const canvasRef = useRef(null);

  // Moving ambient gold flakes canvas (sparse, gentle drift, subtle twinkle)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = 0;
    let height = 0;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Sparse, refined particle count: only 10 flakes across the whole dock
    const FLAKE_COUNT = 10;
    let flakes = [];

    const initFlakes = () => {
      flakes = [];
      for (let i = 0; i < FLAKE_COUNT; i++) {
        flakes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.8, // 0.8px to 2.3px
          vx: (Math.random() - 0.5) * 0.18, // gentle horizontal drift
          vy: -(Math.random() * 0.22 + 0.1), // gentle upward float
          baseAlpha: Math.random() * 0.45 + 0.35,
          alpha: 0.5,
          twinkleSpeed: Math.random() * 0.025 + 0.015,
          twinklePhase: Math.random() * Math.PI * 2,
          aspect: Math.random() * 0.4 + 0.8,
          rotation: Math.random() * Math.PI,
          vRot: (Math.random() - 0.5) * 0.015,
        });
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (width === 0 || height === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (flakes.length === 0) {
        initFlakes();
      }
    };

    resize();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];

        if (!prefersReduced) {
          f.x += f.vx;
          f.y += f.vy;
          f.rotation += f.vRot;
          f.twinklePhase += f.twinkleSpeed;
          f.alpha = f.baseAlpha * (0.6 + 0.4 * Math.sin(f.twinklePhase));

          // Wrap seamlessly
          if (f.y < -4) {
            f.y = height + 4;
            f.x = Math.random() * width;
          }
          if (f.x < -4) f.x = width + 4;
          if (f.x > width + 4) f.x = -4;
        }

        ctx.save();
        ctx.translate(f.x, f.y);
        ctx.rotate(f.rotation);

        // Warm gold tone
        ctx.fillStyle = `rgba(214, 173, 99, ${f.alpha})`;
        ctx.beginPath();
        ctx.ellipse(0, 0, f.size * f.aspect, f.size, 0, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glint center for larger flakes
        if (f.size > 1.6) {
          ctx.fillStyle = `rgba(255, 235, 170, ${f.alpha * 0.7})`;
          ctx.beginPath();
          ctx.arc(0, 0, f.size * 0.35, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      if (!prefersReduced && !document.hidden) {
        animId = requestAnimationFrame(draw);
      }
    };

    if (prefersReduced) {
      draw();
    } else {
      animId = requestAnimationFrame(draw);
    }

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else if (!prefersReduced) {
        animId = requestAnimationFrame(draw);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['work', 'about', 'experience', 'contact'];
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-30% 0px -40% 0px', threshold: 0.1 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
      target.scrollIntoView({ behavior, block: 'start' });
    }
  };

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 z-40 pointer-events-none lg:hidden flex justify-center px-3"
      style={{
        bottom: 'calc(12px + env(safe-area-inset-bottom, 0px))',
      }}
    >
      <div
        className="mobile-dock pointer-events-auto flex items-center justify-between gap-1 p-1.5 w-full max-w-[290px] xs:max-w-[310px] rounded-full"
        style={{ '--active-index': Math.max(0, NAV_ITEMS.findIndex(({ id }) => id === activeSection)) }}
      >
        {/* Moving Gold Flakes Micro-Canvas */}
        <canvas ref={canvasRef} className="dock-gold-canvas" aria-hidden="true" />

        <span className="mobile-dock-indicator" aria-hidden="true" />
        
        {NAV_ITEMS.map(({ id, href, label, icon }) => {
          const isActive = activeSection === id;
          return (
            <a
              key={id}
              href={href}
              onClick={(e) => handleNav(e, href)}
              aria-current={isActive ? 'location' : undefined}
              className={`mobile-dock-item relative z-10 flex flex-col items-center justify-center flex-1 py-1.5 px-2 rounded-full transition-colors duration-200 select-none ${isActive ? 'text-[#D6AD63] font-bold' : 'text-[#A1A1AA] hover:text-[#F2F0EB]'}`}
            >
              <span className="transition-transform duration-200">{icon}</span>
              <span className="text-[10px] font-mono tracking-tight mt-0.5 leading-none">
                {label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
