import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'About & Skills', to: '/about' },
  { label: 'Contact', to: '/contact' },
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
        className="sticky top-0 z-50 nav-backdrop border-b border-[#292C32]/80 transition-all duration-300"
      >
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

          {/* Desktop Navigation Links */}
          <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-7">
            <ul role="list" className="flex items-center gap-7 m-0 p-0 list-none">
              {NAV_LINKS.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className={`text-sm font-medium transition-colors tracking-wide py-1 border-b ${
                      isActive(to)
                        ? 'text-[#D6AD63] border-[#D6AD63]'
                        : 'text-[#A1A1AA] hover:text-[#F2F0EB] border-transparent hover:border-[#D6AD63]'
                    }`}
                    aria-current={isActive(to) ? 'page' : undefined}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

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
      </header>
    </>
  );
}
