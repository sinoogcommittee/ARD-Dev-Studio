import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  {
    id: 'home',
    to: '/',
    label: 'Home',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'projects',
    to: '/projects',
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
    to: '/about',
    label: 'About',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    id: 'contact',
    to: '/contact',
    label: 'Contact',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    ),
  },
];

export default function MobileFloatingNav() {
  const { pathname } = useLocation();
  const canvasRef = useRef(null);
  const navRef = useRef(null);

  // Force Chromium on mobile to composite and position fixed navbar on initial paint
  useEffect(() => {
    const forceComposite = () => {
      const el = navRef.current;
      if (!el) return;
      el.style.transform = 'translateZ(0.001px)';
      void el.offsetHeight;
      requestAnimationFrame(() => {
        if (el) el.style.transform = 'translateZ(0)';
      });
    };
    forceComposite();
    const t = setTimeout(forceComposite, 80);
    return () => clearTimeout(t);
  }, []);

  // Determine active index by route
  const getActiveIndex = () => {
    if (pathname === '/') return 0;
    if (pathname.startsWith('/projects')) return 1;
    if (pathname.startsWith('/about')) return 2;
    if (pathname.startsWith('/contact')) return 3;
    return 0;
  };
  const activeIndex = getActiveIndex();

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

  return (
    <nav
      ref={navRef}
      aria-label="Mobile navigation"
      className="mobile-nav-container fixed inset-x-0 bottom-3 z-50 pointer-events-none lg:hidden flex justify-center px-3"
      style={{
        bottom: 'max(12px, calc(12px + env(safe-area-inset-bottom, 0px)))',
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
      }}
    >
      <div
        className="mobile-dock pointer-events-auto flex items-center justify-between gap-1 p-1.5 w-full max-w-[290px] xs:max-w-[310px] rounded-full"
        style={{ '--active-index': activeIndex }}
      >
        {/* Moving Gold Flakes Micro-Canvas */}
        <canvas ref={canvasRef} className="dock-gold-canvas" aria-hidden="true" />

        <span className="mobile-dock-indicator" aria-hidden="true" />
        
        {NAV_ITEMS.map(({ id, to, label, icon }, idx) => {
          const isActive = activeIndex === idx;
          return (
            <Link
              key={id}
              to={to}
              aria-current={isActive ? 'page' : undefined}
              className={`mobile-dock-item relative z-10 flex flex-col items-center justify-center flex-1 py-1.5 px-2 rounded-full transition-colors duration-200 select-none ${isActive ? 'text-[#D6AD63] font-bold' : 'text-[#A1A1AA] hover:text-[#F2F0EB]'}`}
            >
              <span className="transition-transform duration-200">{icon}</span>
              <span className="text-[10px] font-mono tracking-tight mt-0.5 leading-none">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
