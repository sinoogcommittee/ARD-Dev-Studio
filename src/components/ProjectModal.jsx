import { useEffect, useRef } from 'react';
import { getCategoryMeta } from './categoryMeta';

export default function ProjectModal({ project, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!project) return;

    // Close on Escape key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);

    // Focus inside modal
    if (modalRef.current) {
      modalRef.current.focus();
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const meta = getCategoryMeta(project.category);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="w-full max-w-2xl bg-[#17191E] border border-[#292C32] rounded-xl shadow-2xl overflow-hidden relative outline-none flex flex-col max-h-[90vh] anim-fade-up"
      >
        {/* Top category luminous bar */}
        <div
          className="h-1.5 w-full"
          style={{
            background: `linear-gradient(90deg, ${meta.accentColor} 0%, #D6AD63 100%)`,
          }}
        />

        {/* Modal Header */}
        <div className="p-6 sm:p-8 pb-4 flex items-start justify-between gap-4 border-b border-[#292C32]/70">
          <div>
            <div className="flex items-center gap-2.5 mb-2.5">
              <span
                className={`font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${meta.badgeClass}`}
              >
                {meta.shortLabel}
              </span>

              {project.featured && (
                <span className="font-mono text-[10px] font-bold text-[#D6AD63] bg-[#D6AD63]/10 border border-[#D6AD63]/30 px-2 py-0.5 rounded-full">
                  ★ Featured Deployment
                </span>
              )}
            </div>

            <h2
              id="modal-title"
              className="font-display text-2xl sm:text-3xl font-bold text-[#F2F0EB] tracking-tight"
            >
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-lg bg-[#1E2127] border border-[#292C32] text-[#A1A1AA] hover:text-[#F2F0EB] hover:border-[#D6AD63] transition-colors flex items-center justify-center shrink-0 focus:outline-none focus:ring-2 focus:ring-[#D6AD63]"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-sm text-[#A1A1AA]">
          {/* Full Screenshot Preview for Highlight Projects */}
          {project.previewImage && (
            <div className="relative w-full aspect-video bg-[#090A0D] border border-[#292C32] rounded-xl overflow-hidden flex items-center justify-center shadow-inner">
              <img
                src={project.previewImage}
                alt={`${project.title} live interface preview`}
                className="w-full h-full object-contain rounded"
              />
            </div>
          )}

          {/* System Purpose & Description */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#F2F0EB] font-bold mb-2">
              System Purpose &amp; Operational Scope
            </h3>
            <p className="text-base text-[#F2F0EB] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Technology Architecture */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#F2F0EB] font-bold mb-2.5">
              Technologies &amp; Architecture
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded bg-[#1E2127] border border-[#292C32] text-xs font-mono text-[#D6AD63]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Deployment Telemetry */}
          <div className="p-4 rounded-lg bg-[#101114] border border-[#292C32] space-y-2 font-mono text-xs">
            <div className="flex justify-between items-center text-[#71717A]">
              <span>Verified Deployment:</span>
              <span className="text-[#34d399] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
                Live HTTPS Production
              </span>
            </div>
            <div className="flex justify-between items-center text-[#71717A]">
              <span>Host Destination:</span>
              <span className="text-[#F2F0EB]">
                {new URL(project.liveUrl).hostname}
              </span>
            </div>
            <div className="flex justify-between items-center text-[#71717A]">
              <span>Category Domain:</span>
              <span className="text-[#F2F0EB]">{project.category}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 sm:p-8 pt-4 border-t border-[#292C32] bg-[#101114]/50 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="btn-dark-outline text-xs py-2 px-4"
          >
            Close Overview
          </button>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold-primary text-xs py-2.5 px-5 font-semibold"
          >
            <span>Launch Live Application</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
