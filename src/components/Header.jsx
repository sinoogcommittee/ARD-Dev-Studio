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

        <div className="container-custom flex items-center justify-between h-16 sm:h-18">
          {/* Left: Brand Wordmark with authentic ARD logo */}
          <div className="flex items-center shrink-0 w-auto lg:w-1/4">
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
          </div>

          {/* Center: Facebook-style Desktop Navigation Tabs */}
          <nav aria-label="Primary navigation" className="hidden lg:flex items-center justify-center flex-1 h-full">
            <ul role="list" className="flex items-center h-full m-0 p-0 list-none gap-1 sm:gap-2">
              {NAV_LINKS.map(({ label, to, icon: Icon }) => {
                const active = isActive(to);
                return (
                  <li key={to} className="relative group h-full flex items-center">
                    <Link
                      to={to}
                      aria-label={label}
                      aria-current={active ? 'page' : undefined}
                      className={`relative flex items-center justify-center h-full w-20 xl:w-24 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6AD63] ${
                        active
                          ? 'text-[#D6AD63]'
                          : 'text-[#71717A] hover:text-[#F3DEAB]'
                      }`}
                    >
                      {/* Subtle hover background highlight (like Facebook tabs) */}
                      <span
                        className={`absolute inset-y-2 inset-x-1 rounded-xl transition-colors duration-200 ${
                          active ? 'bg-transparent' : 'group-hover:bg-[#1A1C22]'
                        }`}
                        aria-hidden="true"
                      />

                      {/* Tab Icon */}
                      <span className="relative z-10 transition-transform duration-200 group-hover:scale-110">
                        <Icon size={21} strokeWidth={active ? 2.4 : 1.9} aria-hidden="true" />
                      </span>

                      {/* Facebook-style Bottom Active Indicator Bar */}
                      {active && (
                        <span
                          className="absolute bottom-0 inset-x-1 h-[3.5px] rounded-t-sm bg-[#D6AD63] shadow-[0_0_12px_rgba(214,173,99,0.85)] z-30"
                          aria-hidden="true"
                        />
                      )}
                    </Link>

                    {/* Tooltip on hover / keyboard focus */}
                    <div
                      role="tooltip"
                      className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 rounded-md bg-[#16181D]/95 border border-[#D6AD63]/40 shadow-[0_8px_20px_rgba(0,0,0,0.7),0_0_12px_rgba(214,173,99,0.15)] backdrop-blur-md opacity-0 translate-y-1 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:scale-100 transition-all duration-200 ease-out z-50 whitespace-nowrap"
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
          </nav>

          {/* Right: Compact Available Status Indicator */}
          <div className="flex items-center justify-end shrink-0 w-auto lg:w-1/4">
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#17191E] border border-[#292C32] text-[10px] sm:text-[11px] font-mono text-emerald-400 select-none shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
              title="Currently available for projects & roles"
            >
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
