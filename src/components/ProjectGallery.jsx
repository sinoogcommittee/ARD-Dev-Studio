import { useState, useMemo } from 'react';
import { projects, PROJECT_CATEGORIES } from '../data/projects';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { RevealDiv } from '../hooks/useScrollReveal';

export default function ProjectGallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  // Sorted list: featured cross-domain projects first, then remainder
  const sortedProjects = useMemo(() => {
    const featured = projects.filter((p) => p.featured);
    const regular = projects.filter((p) => !p.featured);
    return [...featured, ...regular];
  }, []);

  // Filtered by category + search query
  const filteredProjects = useMemo(() => {
    return sortedProjects.filter((project) => {
      const matchesCategory =
        activeFilter === 'All' || project.category === activeFilter;
      const matchesSearch =
        !searchQuery.trim() ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.stack.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery, sortedProjects]);

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="section-spacing bg-[#101114] border-b border-[#292C32] relative"
    >
      <div className="container-custom">
        {/* Section Header */}
        <RevealDiv className="mb-12 max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6AD63]" />
            <span className="mono-caps text-[#D6AD63]">Live Deployments</span>
          </div>
          <h2
            id="work-heading"
            className="font-display text-3xl sm:text-5xl font-bold text-[#F2F0EB] tracking-tight mb-4"
          >
            Production Systems &amp; Web Applications
          </h2>
          <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
            All 16 production applications deployed live on the web, spanning healthcare,
            civic governance, sports tabulation, and educational platforms. Click any card to inspect architecture.
          </p>
        </RevealDiv>

        {/* Filter Controls & Search */}
        <RevealDiv delay={80} className="mb-10 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Category Pill Filters */}
          <div
            role="group"
            aria-label="Filter projects by domain"
            className="flex flex-wrap gap-2"
          >
            {PROJECT_CATEGORIES.map((category) => {
              const count =
                category === 'All'
                  ? projects.length
                  : projects.filter((p) => p.category === category).length;

              return (
                <button
                  key={category}
                  className={`filter-pill ${activeFilter === category ? 'active' : ''}`}
                  aria-pressed={activeFilter === category}
                  onClick={() => setActiveFilter(category)}
                >
                  <span>{category === 'All' ? 'All Deployments' : category}</span>
                  <span className="ml-1.5 text-xs opacity-70 font-mono">
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Search Input */}
          <div className="w-full md:w-64 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack or title..."
              aria-label="Filter projects by keyword"
              className="w-full bg-[#17191E] border border-[#292C32] rounded-full py-2 pl-9 pr-4 text-xs font-mono text-[#F2F0EB] placeholder-[#71717A] focus:outline-none focus:border-[#D6AD63] transition-colors"
            />
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#71717A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-3 top-2.5 pointer-events-none"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2 text-[#71717A] hover:text-[#F2F0EB] text-xs font-mono"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </RevealDiv>

        {/* Live Status Count */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#292C32]/60">
          <p
            aria-live="polite"
            aria-atomic="true"
            className="font-mono text-xs text-[#A1A1AA] uppercase tracking-wider"
          >
            Displaying {filteredProjects.length} of {projects.length} Deployed Applications
          </p>

          <span className="font-mono text-[11px] text-[#71717A]">
            Priority: Cross-Domain Featured Systems First
          </span>
        </div>

        {/* ─── Projects Grid (Responsive 1/2/3 cols) ─────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <RevealDiv key={project.id} delay={Math.min(index * 45, 300)}>
              <ProjectCard project={project} onSelect={setSelectedProject} />
            </RevealDiv>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="py-20 text-center bg-[#17191E]/60 rounded-xl border border-[#292C32] p-8">
            <p className="font-display text-xl text-[#F2F0EB] mb-2">
              No matching applications found
            </p>
            <p className="text-sm text-[#A1A1AA] mb-6">
              Try resetting your search query or selecting another category filter.
            </p>
            <button
              onClick={() => {
                setActiveFilter('All');
                setSearchQuery('');
              }}
              className="btn-gold-primary text-xs py-2 px-4"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* ─── Cinematic Project Inspection Modal ───────────────────────── */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
