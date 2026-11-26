import { motion } from 'motion/react';
import { getCategoryMeta } from './categoryMeta';
import { useMouseTilt } from '../hooks/useMouseTilt';

/**
 * Premium Dark Editorial Project Card.
 * Integrated with dynamic 3D perspective tilt, cursor spotlight tracking,
 * and quick-inspection drawer trigger.
 */
export default function ProjectCard({ project, onSelect }) {
  const meta = getCategoryMeta(project.category);
  const { tiltStyle, spotlightPos, pointerHandlers } = useMouseTilt(6);

  const handleCardClick = (e) => {
    // If the click is inside a link or button, let that action happen naturally
    if (e.target.closest('a')) return;
    if (onSelect) {
      onSelect(project);
    }
  };

  return (
    <motion.article
      style={tiltStyle}
      {...pointerHandlers}
      onClick={handleCardClick}
      className="card-dark group flex flex-col justify-between p-6 sm:p-7 relative cursor-pointer select-none"
      aria-label={`${project.title} — ${meta.shortLabel}. Click to inspect architecture details.`}
    >
      {/* Dynamic Cursor Spotlight Beam */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none transition-opacity duration-200"
        style={{
          opacity: spotlightPos.opacity,
          '--spot-x': spotlightPos.x,
          '--spot-y': spotlightPos.y,
          '--spot-color': meta.glowColor,
          background: 'radial-gradient(circle 220px at var(--spot-x) var(--spot-y), var(--spot-color), transparent 70%)',
        }}
      />

      {/* Ambient background monogram watermark */}
      <div
        aria-hidden="true"
        className="absolute -right-2 -bottom-4 font-display font-extrabold text-8xl text-white/[0.02] group-hover:text-white/[0.06] group-hover:scale-105 transition-all duration-500 pointer-events-none select-none"
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
      <div className="flex items-center justify-between gap-3 mb-4 relative z-10">
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

      {/* Full Screenshot Preview for Highlight Projects (100% visible, no clipping) */}
      {project.previewImage && (
        <div className="relative w-full aspect-video bg-[#090A0D] border border-[#292C32] rounded-lg overflow-hidden mb-4 group-hover:border-[#D6AD63]/50 transition-colors flex items-center justify-center z-10">
          <img
            src={project.previewImage}
            alt={`${project.title} live interface preview`}
            loading="lazy"
            className="w-full h-full object-contain rounded"
          />
        </div>
      )}

      {/* Project Title & Description */}
      <div className="flex-1 mb-6 relative z-10">
        <h3 className="font-display text-xl font-bold text-[#F2F0EB] group-hover:text-[#D6AD63] transition-colors leading-snug mb-2.5">
          {project.title}
        </h3>

        <p className="text-sm text-[#A1A1AA] leading-relaxed line-clamp-3">
          {project.description}
        </p>
      </div>

      {/* Technology Stack Tags */}
      <div className="mb-6 flex flex-wrap gap-1.5 relative z-10">
        {project.stack.map((tag) => (
          <span key={tag} className="tech-chip">
            {tag}
          </span>
        ))}
      </div>

      {/* Footer / Live Deployment Call to Action */}
      <div className="pt-4 border-t border-[#292C32]/70 flex items-center justify-between relative z-10">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title} live deployment (opens in new tab)`}
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#D6AD63] hover:text-[#E5BE75] group/link transition-colors py-1"
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

        <button
          type="button"
          onClick={() => onSelect && onSelect(project)}
          className="font-mono text-[11px] text-[#A1A1AA] hover:text-[#F2F0EB] transition-colors flex items-center gap-1 focus:outline-none"
          aria-label={`View architecture details for ${project.title}`}
        >
          <span>Inspect</span>
          <span>→</span>
        </button>
      </div>
    </motion.article>
  );
}
