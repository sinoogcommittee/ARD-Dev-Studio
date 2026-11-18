import { profile } from '../data/profile';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScroll = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer
      role="contentinfo"
      className="bg-[#0b0c0e] border-t border-[#292C32] py-16 text-[#A1A1AA] text-sm relative"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#292C32]/80">
          
          {/* Identity & Location */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg overflow-hidden bg-[#17191E] border border-[#D6AD63]/40 flex items-center justify-center shadow-[0_0_12px_rgba(214,173,99,0.2)] shrink-0">
                <img
                  src="/images/logo.jpg"
                  alt="ARD Dev Studio Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-[#F2F0EB]">
                  ARD Dev Studio
                </span>
                <span className="font-mono text-xs text-[#A1A1AA]">
                  {profile.identity.name}
                </span>
              </div>
            </div>
            
            <p className="font-mono text-xs text-[#D6AD63] uppercase tracking-wider">
              {profile.identity.role}
            </p>

            <p className="text-xs text-[#71717A] max-w-sm leading-relaxed">
              {profile.identity.location}
            </p>

            <p className="text-xs text-[#A1A1AA] pt-2">
              {profile.identity.resumeClaim}
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[#F2F0EB] font-semibold block">
              Navigation
            </span>
            <nav aria-label="Footer navigation">
              <ul role="list" className="space-y-2 p-0 m-0 list-none text-xs">
                {[
                  { label: 'Production Projects', href: '#work' },
                  { label: 'Technical Expertise', href: '#about' },
                  { label: 'Work History', href: '#experience' },
                  { label: 'Contact & Inquiry', href: '#contact' },
                ].map(({ label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      onClick={(e) => handleScroll(e, href)}
                      className="text-[#A1A1AA] hover:text-[#D6AD63] transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Direct Verified Outlets */}
          <div className="md:col-span-4 space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[#F2F0EB] font-semibold block">
              Contact Channels
            </span>
            <div className="space-y-2 text-xs font-mono">
              <div>
                <span className="text-[#71717A] block text-[10px] uppercase">Email</span>
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="text-[#D6AD63] hover:underline"
                >
                  {profile.contact.email}
                </a>
              </div>

              <div>
                <span className="text-[#71717A] block text-[10px] uppercase">Phone</span>
                <a
                  href={`tel:${profile.contact.phone.replace(/\s+/g, '')}`}
                  className="text-[#A1A1AA] hover:text-[#F2F0EB]"
                >
                  {profile.contact.phone}
                </a>
              </div>

              <div>
                <span className="text-[#71717A] block text-[10px] uppercase">Facebook</span>
                <a
                  href={profile.contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A1A1AA] hover:text-[#F2F0EB]"
                >
                  facebook.com/realnariel ↗
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Availability */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#71717A]">
          <p>
            &copy; {currentYear} ARD Dev Studio • {profile.identity.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[#A1A1AA]">
              {profile.identity.availability}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
