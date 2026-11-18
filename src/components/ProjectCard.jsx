import { getCategoryMeta } from './categoryMeta';

/**
 * Premium Dark Editorial Project Card.
 * Features intentional typographic branding, category luminous indicator,
 * technology stack chips, and prominent live deployment access.
 */
export default function ProjectCard({ project }) {
  const meta = getCategoryMeta(project.category);

  return (
    <article
      className="card-dark group flex flex-col justify-between p-6 sm:p-7 relative transition-all duration-300"
      aria-label={`${project.title} — ${meta.shortLabel}`}
      style={{
        '--card-accent': meta.accentColor,
      }}
    >
      {/* Ambient background monogram glow */}
      <div
        aria-hidden="true"
        className="absolute -right-2 -bottom-4 font-display font-extrabold text-8xl text-white/[0.02] group-hover:text-white/[0.05] group-hover:scale-105 transition-all duration-500 pointer-events-none select-none"
      >
        {project.title.charAt(0)}
      </div>

      {/* Top Hairline Luminous Category Accent */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, ${meta.accentColor} 0%, transparent 80%)`,
        }}
      />

      {/* Header: Category Badge & Featured Flag */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <span
          className={`font-mono text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider ${meta.badgeClass}`}
        >
          {meta.shortLabel}
        </span>

        {project.featured && (
          <span className="flex items-center gap-1 font-mono text-[10px] uppercase font-bold tracking-wider text-[#D6AD63] bg-[#D6AD63]/10 border border-[#D6AD63]/30 px-2.5 py-0.5 rounded-full shadow-sm">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            Featured
          </span>
        )}
      </div>

      {/* Project Title & Description */}
      <div className="flex-1 mb-6">
        <h3 className="font-display text-xl font-bold text-[#F2F0EB] group-hover:text-[#D6AD63] transition-colors leading-snug mb-2.5">
          {project.title}
        </h3>

        <p className="text-sm text-[#A1A1AA] leading-relaxed line-clamp-3">
          {project.description}
        </p>
      </div>

      {/* Technology Stack Tags */}
      <div className="mb-6 flex flex-wrap gap-1.5">
        {project.stack.map((tag) => (
          <span key={tag} className="tech-chip">
            {tag}
          </span>
        ))}
      </div>

      {/* Footer / Live Deployment Call to Action */}
      <div className="pt-4 border-t border-[#292C32]/70 flex items-center justify-between">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title} live deployment (opens in new tab)`}
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#D6AD63] hover:text-[#E5BE75] group/link transition-colors"
        >
          <span>Launch Live Site</span>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
          >
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </a>

        <span className="font-mono text-[10px] text-[#71717A] tracking-wider truncate max-w-[140px] opacity-70">
          {new URL(project.liveUrl).hostname}
        </span>
      </div>
    </article>
  );
}
