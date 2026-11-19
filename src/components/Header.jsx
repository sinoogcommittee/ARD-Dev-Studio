import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, User, MessageSquare } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'Projects', to: '/projects', icon: LayoutGrid },
  { label: 'About & Skills', to: '/about', icon: User },
  { label: 'Contact', to: '/contact', icon: MessageSquare },
];

export default function Header({ currentStatus }) {
  const { pathname } = useLocation();

  const isActive = (to) =>
    to === '/' ? pathname === '/' : pathname.startsWith(to);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header
        id="site-nav"
        role="banner"
        className="sticky top-0 z-50 relative nav-backdrop transition-all duration-300"
      >
        {/* Sinoog 2027 Metallic Gold Line — Top */}
        <div
          className="header-gold-line header-gold-line-top absolute top-0 left-0 right-0 h-[2px] pointer-events-none z-20"
          aria-hidden="true"
        />

        <div className="container-custom flex items-center justify-between h-18 py-3.5">
          {/* Brand Wordmark with authentic ARD logo */}
          <Link
            to="/"
            aria-label="ARD Dev Studio — Home"
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
          </Link>

          {/* Desktop Navigation Links (Icon-based with hover labels) */}
          <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#121316]/90 border border-[#292C32] shadow-[0_4px_20px_rgba(0,0,0,0.35),inset_0_1px_rgba(255,255,255,0.03)]">
              <ul role="list" className="flex items-center gap-1.5 m-0 p-0 list-none">
                {NAV_LINKS.map(({ label, to, icon: Icon }) => {
                  const active = isActive(to);
                  return (
                    <li key={to} className="relative group">
                      <Link
                        to={to}
                        aria-label={label}
                        aria-current={active ? 'page' : undefined}
                        className={`relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6AD63] ${
                          active
                            ? 'bg-[#D6AD63]/15 text-[#D6AD63] border border-[#D6AD63]/50 shadow-[0_0_14px_rgba(214,173,99,0.22)]'
                            : 'bg-transparent text-[#A1A1AA] hover:text-[#F3DEAB] hover:bg-[#1C1E24] border border-transparent hover:border-[#D6AD63]/30'
                        }`}
                      >
                        <Icon size={19} strokeWidth={active ? 2.2 : 1.8} aria-hidden="true" />
                        {active && (
                          <span
                            className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#D6AD63] shadow-[0_0_8px_#D6AD63]"
                            aria-hidden="true"
                          />
                        )}
                      </Link>

                      {/* Tooltip on hover / focus */}
                      <div
                        role="tooltip"
                        className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2.5 px-3 py-1 rounded-md bg-[#16181D] border border-[#D6AD63]/40 shadow-[0_8px_20px_rgba(0,0,0,0.7),0_0_12px_rgba(214,173,99,0.15)] backdrop-blur-md opacity-0 translate-y-1 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:scale-100 transition-all duration-200 ease-out z-50 whitespace-nowrap"
                      >
                        <span className="font-mono text-[11px] font-semibold text-[#F3DEAB] tracking-wide">
                          {label}
                        </span>
                        <div
                          className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#16181D] border-t border-l border-[#D6AD63]/40"
                          aria-hidden="true"
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Availability Pill & Contact CTA */}
            <div className="flex items-center gap-4 pl-4 border-l border-[#292C32]">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#17191E] border border-[#292C32] text-xs font-mono text-[#A1A1AA]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available</span>
              </div>

              <Link
                to="/contact"
                className="btn-gold-primary border-beam text-xs py-2 px-4 h-9 font-semibold"
              >
                Start a Conversation
              </Link>
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

        {/* Sinoog 2027 Metallic Gold Line — Bottom */}
        <div
          className="header-gold-line header-gold-line-bottom absolute bottom-0 left-0 right-0 h-[2px] pointer-events-none z-20"
          aria-hidden="true"
        />
      </header>
    </>
  );
}
