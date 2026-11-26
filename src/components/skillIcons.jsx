import React from 'react';

/**
 * High-fidelity vector SVG logos & icons for Anthony Riel C. Diango's verified skills.
 * Styled for the dark editorial & gold accent aesthetic.
 */

export function ReactIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} fill="none" {...props}>
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

export function JavaScriptIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" {...props}>
      <rect width="24" height="24" rx="4" fill="#F7DF1E" />
      <path
        d="M7.5 18c-.8 0-1.4-.3-1.8-.7l.8-1.3c.3.3.7.5 1.1.5.6 0 .9-.3.9-.9v-5.1h1.7v5.2c0 1.5-.9 2.3-2.7 2.3zm6.4-.1c-1.5 0-2.5-.8-2.9-1.8l1.4-.8c.3.6.7 1 1.5 1 .6 0 1.1-.3 1.1-.7 0-.5-.4-.7-1.3-.9-1.4-.3-2.3-.8-2.3-2 0-1.1.9-1.9 2.3-1.9 1.1 0 1.9.4 2.5 1.4l-1.3.8c-.3-.5-.7-.7-1.2-.7-.5 0-.8.3-.8.6 0 .4.3.6 1.1.8 1.6.4 2.5.9 2.5 2.1 0 1.3-1 2.2-2.5 2.2z"
        fill="#000000"
      />
    </svg>
  );
}

export function HTML5Icon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" {...props}>
      <path d="M3 2l1.8 18.2L12 22l7.2-1.8L21 2H3z" fill="#E34F26" />
      <path d="M12 3.8v16.4l5.7-1.4 1.5-15H12z" fill="#EF652A" />
      <path d="M12 7.6H7.3l.3 3.3h4.4v-3.3zm0 6.6H9.4l-.2-2.2H7.3l.4 4.5h4.3v-2.3z" fill="#EBEBEB" />
      <path d="M12 7.6v3.3h4.2l-.4 4.4-3.8 1v2.3l6-1.6.8-9.4H12z" fill="#FFFFFF" />
    </svg>
  );
}

export function CSS3Icon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" {...props}>
      <path d="M3 2l1.8 18.2L12 22l7.2-1.8L21 2H3z" fill="#1572B6" />
      <path d="M12 3.8v16.4l5.7-1.4 1.5-15H12z" fill="#33A9DC" />
      <path d="M12 7.6H7.3l.3 3.3h4.4v-3.3zm0 6.6H9.4l-.2-2.2H7.3l.4 4.5h4.3v-2.3z" fill="#EBEBEB" />
      <path d="M12 7.6v3.3h4.2l-.4 4.4-3.8 1v2.3l6-1.6.8-9.4H12z" fill="#FFFFFF" />
    </svg>
  );
}

export function TailwindIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" {...props}>
      <path
        d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"
        fill="#38BDF8"
      />
    </svg>
  );
}

export function SupabaseIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" {...props}>
      <path
        d="M13.47 22.37c-.77.94-2.28.45-2.36-.76l-.7-10.45 10.33 2.1c1.23.25 1.53 1.85.5 2.52l-7.77 6.59z"
        fill="#3ECF8E"
      />
      <path
        d="M10.53 1.63c.77-.94 2.28-.45 2.36.76l.7 10.45-10.33-2.1c-1.23-.25-1.53-1.85-.5-2.52l7.77-6.59z"
        fill="#249361"
      />
    </svg>
  );
}

export function DotNetIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" {...props}>
      <rect width="24" height="24" rx="4" fill="#512BD4" />
      <path
        d="M6 16.5V7.5h2.1l3.5 5.3V7.5H13v9h-2.1L7.4 11.2v5.3H6zm9.2 0V7.5h4.8v1.6H17v2.1h2.5v1.6H17v2.1h3v1.6h-4.8z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function CSharpIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" {...props}>
      <rect width="24" height="24" rx="4" fill="#239120" />
      <path
        d="M10.8 15.6c-2.3 0-3.8-1.5-3.8-3.6s1.5-3.6 3.8-3.6c1.3 0 2.2.4 2.8 1.1l-1.1 1.2c-.4-.5-1-.8-1.7-.8-1.3 0-2.1.9-2.1 2.1s.8 2.1 2.1 2.1c.7 0 1.3-.3 1.7-.8l1.1 1.2c-.6.7-1.5 1.1-2.8 1.1zm4.8-1.6h1v-1.2h-1v-1.6h1.6V10h-1.6V8.6h-1.2V10h-1.1V8.6h-1.2V10h-.9v1.2h.9v1.6h-.9V14h.9v1.4h1.2V14h1.1v1.4h1.2V14h.6v-1.2h-.6v-1.6zm-1.2 0h-1.1v-1.6h1.1v1.6z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function JavaIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" {...props}>
      <path
        d="M8.8 17.5c2.3.2 4.6.3 6.9-.2.5-.1.8.2.8.5 0 .3-.4.5-.8.6-2.5.5-5.1.4-7.6-.2-.3-.1-.5-.4-.4-.6.1-.2.4-.2.7-.1zm-.6 2.2c2.8.2 5.6.2 8.3-.3.4-.1.7.2.7.5 0 .3-.3.5-.7.6-3 .5-6 .5-9-.1-.3-.1-.5-.4-.4-.6.1-.2.4-.2.7-.1zM11.9 2c.4 1.4-.4 2.7-.9 3.9-.4 1-.7 2.1-.4 3.1.2-.8.5-1.6.8-2.3.6-1.5 1.4-2.9 1.1-4.7h-.6zm3.3 2.5c.3 1-.3 1.9-.7 2.7-.3.7-.5 1.5-.3 2.2.1-.6.4-1.1.6-1.6.4-1 1-2 .8-3.3h-.4z"
        fill="#E76F00"
      />
      <path
        d="M17.8 13.5c-.3-.2-.6-.3-.9-.3.2-.4.3-.8.2-1.2-.1-.7-.7-1.1-1.4-1.1h-7c-.7 0-1.3.4-1.4 1.1-.1.4 0 .8.2 1.2-.3 0-.6.1-.9.3-.8.5-1.1 1.4-.8 2.2.3.9 1.1 1.5 2 1.6 2.7.2 5.5.2 8.2 0 .9-.1 1.7-.7 2-1.6.3-.8 0-1.7-.8-2.2zm-1.8.8c-.8.1-1.6.2-2.4.2-2 0-4-.1-6-.2-.3 0-.5-.2-.5-.5 0-.3.2-.5.5-.5h8.4c.3 0 .5.2.5.5 0 .3-.2.5-.5.5z"
        fill="#5382A1"
      />
    </svg>
  );
}

export function PythonIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" {...props}>
      <path
        d="M11.9 2c-3.1 0-4.9 1.4-4.9 3.5v2.6h5v.7H5.6C3.5 8.8 2 10.3 2 13.1c0 2.7 1.4 4.2 3.6 4.2h1.8v-2.5c0-1.6 1.4-3 3-3h5v-.7h-5V5.5c0-.8.7-1.5 1.5-1.5h4.9c.8 0 1.5.7 1.5 1.5v1.6h2V5.5C20.3 3.4 18.2 2 15.1 2h-3.2zm-1.7 1.8c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7z"
        fill="#3776AB"
      />
      <path
        d="M12.1 22c3.1 0 4.9-1.4 4.9-3.5v-2.6h-5v-.7h6.4c2.1 0 3.6-1.5 3.6-4.3 0-2.7-1.4-4.2-3.6-4.2h-1.8v2.5c0 1.6-1.4 3-3 3h-5v.7h5v5.6c0 .8-.7 1.5-1.5 1.5H7.2c-.8 0-1.5-.7-1.5-1.5v-1.6h-2v1.6C3.7 20.6 5.8 22 8.9 22h3.2zm1.7-1.8c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z"
        fill="#FFD43B"
      />
    </svg>
  );
}

export function CPPIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" {...props}>
      <rect width="24" height="24" rx="4" fill="#00599C" />
      <path
        d="M9.5 16c-2.4 0-4-1.6-4-4s1.6-4 4-4c1.4 0 2.4.5 3 1.3l-1.2 1.3c-.5-.6-1.1-.9-1.8-.9-1.4 0-2.3 1-2.3 2.3s.9 2.3 2.3 2.3c.7 0 1.3-.3 1.8-.9l1.2 1.3c-.6.8-1.6 1.3-3 1.3zm5.5-3.3h1.3v-1.4H15V10h-1.4v1.3h-1.3v1.4h1.3v1.3H15v-1.3zm4 0h1.3v-1.4H19V10h-1.4v1.3h-1.3v1.4h1.3v1.3H19v-1.3z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function RenderIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" {...props}>
      <rect width="24" height="24" rx="4" fill="#17191E" stroke="#46E3B7" strokeWidth="1.5" />
      <path d="M7 17V7h4.8c2.2 0 3.7 1.3 3.7 3.3 0 1.5-.9 2.6-2.2 3.1l2.7 3.6h-2.4l-2.4-3.3H9.2V17H7zm2.2-5h2.4c1 0 1.7-.5 1.7-1.5s-.7-1.5-1.7-1.5H9.2V12z" fill="#46E3B7" />
    </svg>
  );
}

export function VercelIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" {...props}>
      <polygon points="12 3 22 20 2 20" fill="#FFFFFF" />
    </svg>
  );
}

export function CloudflareIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" {...props}>
      <path
        d="M18.8 11.2c-.4-2.4-2.5-4.2-5-4.2-1.8 0-3.4.9-4.3 2.3-.4-.2-.8-.3-1.3-.3-2.1 0-3.8 1.7-3.8 3.8 0 .3 0 .5.1.8-1.5.4-2.5 1.7-2.5 3.3 0 1.9 1.6 3.5 3.5 3.5h13.2c1.8 0 3.3-1.5 3.3-3.3 0-1.7-1.3-3.1-3.2-3.6v-.4z"
        fill="#F38020"
      />
    </svg>
  );
}

export function VSCodeIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" {...props}>
      <path d="M17.5 2.5l-9.8 8.8L3.2 8 1 9.3l4.5 3.8L1 16.9l2.2 1.3 4.5-3.3 9.8 8.8 4.5-2.2V4.7L17.5 2.5zm1.5 5.5v10.2l-6-4.1 6-6.1z" fill="#007ACC" />
    </svg>
  );
}

export function AntigravityIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" {...props}>
      <path d="M12 2L3 9l9 13 9-13-9-7z" fill="url(#gold-gradient)" stroke="#D6AD63" strokeWidth="1" />
      <path d="M12 2v20M3 9h18" stroke="#FFF0C7" strokeWidth="0.8" opacity="0.6" />
      <defs>
        <linearGradient id="gold-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D6AD63" />
          <stop offset="50%" stopColor="#9D7134" />
          <stop offset="100%" stopColor="#F3DEAB" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function DatabaseIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <ellipse cx="12" cy="5" rx="9" ry="3" stroke="#D6AD63" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" stroke="#D6AD63" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" stroke="#D6AD63" />
    </svg>
  );
}

export function RestApiIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="16 18 22 12 16 6" stroke="#38BDF8" />
      <polyline points="8 6 2 12 8 18" stroke="#38BDF8" />
      <line x1="10" y1="19" x2="14" y2="5" stroke="#F3DEAB" />
    </svg>
  );
}

export function NetworkIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="6" height="6" rx="1" stroke="#34D399" />
      <rect x="16" y="2" width="6" height="6" rx="1" stroke="#34D399" />
      <rect x="9" y="16" width="6" height="6" rx="1" stroke="#34D399" />
      <path d="M5 8v4h14V8M12 12v4" stroke="#D6AD63" />
    </svg>
  );
}

export function ResponsiveIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="3" width="20" height="14" rx="2" stroke="#60A5FA" />
      <line x1="8" y1="21" x2="16" y2="21" stroke="#60A5FA" />
      <line x1="12" y1="17" x2="12" y2="21" stroke="#60A5FA" />
    </svg>
  );
}

export function DashboardIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 3v18h18" stroke="#C084FC" />
      <path d="M7 16l4-5 4 3 6-8" stroke="#D6AD63" />
      <circle cx="7" cy="16" r="1.5" fill="#D6AD63" />
      <circle cx="11" cy="11" r="1.5" fill="#D6AD63" />
      <circle cx="15" cy="14" r="1.5" fill="#D6AD63" />
      <circle cx="21" cy="6" r="1.5" fill="#D6AD63" />
    </svg>
  );
}

export function PaymentIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="5" width="20" height="14" rx="2" stroke="#FBBF24" />
      <line x1="2" y1="10" x2="22" y2="10" stroke="#FBBF24" />
    </svg>
  );
}

export function PosIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4" y="2" width="16" height="20" rx="2" stroke="#34D399" />
      <line x1="8" y1="6" x2="16" y2="6" stroke="#34D399" />
      <line x1="16" y1="14" x2="16.01" y2="14" stroke="#D6AD63" />
      <line x1="12" y1="14" x2="12.01" y2="14" stroke="#D6AD63" />
      <line x1="8" y1="14" x2="8.01" y2="14" stroke="#D6AD63" />
      <line x1="16" y1="18" x2="16.01" y2="18" stroke="#D6AD63" />
      <line x1="12" y1="18" x2="12.01" y2="18" stroke="#D6AD63" />
      <line x1="8" y1="18" x2="8.01" y2="18" stroke="#D6AD63" />
    </svg>
  );
}

export function StreamIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="2" fill="#EF4444" stroke="#EF4444" />
      <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" stroke="#FBBF24" />
    </svg>
  );
}

/**
 * Maps a skill name string from CONTENT.md / profile.js to its official logo component and metadata.
 */
export const SKILL_META_MAP = {
  'React': { name: 'React', category: 'Frontend', Icon: ReactIcon },
  'Tailwind CSS': { name: 'Tailwind CSS', category: 'Frontend', Icon: TailwindIcon },
  'JavaScript (ES6+, DOM, Fetch API)': { name: 'JavaScript', category: 'Frontend', Icon: JavaScriptIcon },
  'HTML5': { name: 'HTML5', category: 'Frontend', Icon: HTML5Icon },
  'CSS3': { name: 'CSS3', category: 'Frontend', Icon: CSS3Icon },
  'Responsive mobile-first design': { name: 'Responsive Design', category: 'Frontend', Icon: ResponsiveIcon },
  'Interactive dashboards': { name: 'Dashboards', category: 'Frontend', Icon: DashboardIcon },

  'Supabase (PostgreSQL, Auth, Row-Level Security, Storage)': { name: 'Supabase', category: 'Backend', Icon: SupabaseIcon },
  'ASP.NET Core MVC': { name: 'ASP.NET Core', category: 'Backend', Icon: DotNetIcon },
  'C#': { name: 'C#', category: 'Backend', Icon: CSharpIcon },
  'Java (Spring Boot, JavaFX, Swing)': { name: 'Java', category: 'Backend', Icon: JavaIcon },
  'Python': { name: 'Python', category: 'Backend', Icon: PythonIcon },
  'C/C++': { name: 'C / C++', category: 'Backend', Icon: CPPIcon },

  'Render': { name: 'Render', category: 'Cloud', Icon: RenderIcon },
  'Vercel': { name: 'Vercel', category: 'Cloud', Icon: VercelIcon },
  'Somee (.NET hosting)': { name: 'Somee Hosting', category: 'Cloud', Icon: DotNetIcon },
  'Cloudflare R2 media optimization': { name: 'Cloudflare R2', category: 'Cloud', Icon: CloudflareIcon },
  'REST APIs': { name: 'REST APIs', category: 'Integration', Icon: RestApiIcon },
  'Payment gateway integrations': { name: 'Payment Gateways', category: 'Integration', Icon: PaymentIcon },

  'Database architecture and MIS administration': { name: 'Database & MIS', category: 'Systems', Icon: DatabaseIcon },
  'Livestreaming and digital portals': { name: 'Livestreaming', category: 'Systems', Icon: StreamIcon },
  'POS and biometrics deployment': { name: 'POS & Biometrics', category: 'Systems', Icon: PosIcon },
  'LAN/WAN networking': { name: 'LAN/WAN Network', category: 'Systems', Icon: NetworkIcon },

  'VS Code': { name: 'VS Code', category: 'Workflow', Icon: VSCodeIcon },
  'Google Antigravity': { name: 'Google Antigravity', category: 'Workflow', Icon: AntigravityIcon }
};

export function getSkillMeta(skillName) {
  return SKILL_META_MAP[skillName] || {
    name: skillName,
    category: 'Skill',
    Icon: DatabaseIcon
  };
}
