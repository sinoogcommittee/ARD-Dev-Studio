import { useState, useEffect } from 'react';

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

export default function MobileFloatingNav({ onOpenAdmin }) {
  const [activeSection, setActiveSection] = useState('work');

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
        className="mobile-dock pointer-events-auto flex items-center justify-between gap-1 p-1.5 w-full max-w-sm sm:max-w-md rounded-full bg-[#14161B]/95 backdrop-blur-2xl border border-[#292C32] shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_24px_rgba(214,173,99,0.12)]"
        style={{ '--active-index': Math.max(0, NAV_ITEMS.findIndex(({ id }) => id === activeSection)) }}
      >
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

        {/* Studio Admin Portal Trigger */}
        <button
          type="button"
          onClick={onOpenAdmin}
          aria-label="Open Studio Portal"
              className="mobile-dock-item relative z-10 flex flex-col items-center justify-center flex-1 py-1.5 px-2 rounded-full text-[#71717A] hover:text-[#D6AD63] transition-[color,background-color,transform] duration-200 select-none"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <span className="text-[10px] font-mono tracking-tight mt-0.5 leading-none">
            Portal
          </span>
        </button>

      </div>
    </nav>
  );
}
