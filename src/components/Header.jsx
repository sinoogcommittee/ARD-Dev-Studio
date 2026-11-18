import { useState } from 'react';

const NAV_LINKS = [
  { label: 'Projects', href: '#work' },
  { label: 'About & Skills', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Header({ currentStatus }) {
  const handleNav = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header
        id="site-nav"
        role="banner"
        className="sticky top-0 z-50 nav-backdrop border-b border-[#292C32]/80 transition-all duration-300"
      >
        <div className="container-custom flex items-center justify-between h-18 py-3.5">
          {/* Brand Wordmark with authentic ARD logo */}
          <a
            href="#main-content"
            onClick={(e) => handleNav(e, '#main-content')}
            aria-label="ARD Dev Studio — Back to top"
            className="group flex items-center gap-2.5 sm:gap-3 transition-transform duration-200 hover:scale-[1.02] shrink-0"
          >
            <div className="h-9 w-14 sm:h-10 sm:w-16 rounded-lg overflow-hidden bg-[#101114] border border-[#D6AD63]/40 group-hover:border-[#D6AD63] group-hover:shadow-[0_0_16px_rgba(214,173,99,0.35)] transition-all flex items-center justify-center shrink-0 p-0.5">
              <img
                src="/images/logo.jpg"
                alt="ARD Dev Studio Emblem"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col whitespace-nowrap">
              <span className="font-display font-bold text-sm sm:text-base tracking-tight text-[#F2F0EB] group-hover:text-[#D6AD63] transition-colors leading-tight">
                ARD Dev Studio
              </span>
              <span className="font-mono text-[9px] sm:text-[11px] text-[#A1A1AA] tracking-wider uppercase">
                Anthony Riel Diango
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-7">
            <ul role="list" className="flex items-center gap-7 m-0 p-0 list-none">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => handleNav(e, href)}
                    className="text-sm font-medium text-[#A1A1AA] hover:text-[#F2F0EB] transition-colors tracking-wide py-1 border-b border-transparent hover:border-[#D6AD63]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Availability Pill & Contact CTA */}
            <div className="flex items-center gap-4 pl-4 border-l border-[#292C32]">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#17191E] border border-[#292C32] text-xs font-mono text-[#A1A1AA]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available</span>
              </div>

              <a
                href="#contact"
                onClick={(e) => handleNav(e, '#contact')}
                className="btn-gold-primary text-xs py-2 px-4 h-9 font-semibold"
              >
                Start a Conversation
              </a>
            </div>
          </nav>

          {/* Mobile/Tablet Right Status Indicator (Compact, non-wrapping) */}
          <div className="flex items-center gap-2 lg:hidden shrink-0">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#17191E] border border-[#292C32] text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available</span>
            </div>
          </div>

        </div>
      </header>
    </>
  );
}
