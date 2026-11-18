import { useState, useMemo } from 'react';
import { projects, PROJECT_CATEGORIES } from '../data/projects';
import ProjectCard from './ProjectCard';
import { RevealDiv } from '../hooks/useScrollReveal';

export default function ProjectGallery() {
  const [activeFilter, setActiveFilter] = useState('All');

  // Featured projects first (maintaining CONTENT.md category variety),
  // then remaining by category order.
  const sortedProjects = useMemo(() => {
    const featured = projects.filter(p => p.featured);
    const rest     = projects.filter(p => !p.featured);
    return [...featured, ...rest];
  }, []);

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return sortedProjects;
    return sortedProjects.filter(p => p.category === activeFilter);
  }, [activeFilter, sortedProjects]);

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="section-pad"
      style={{ background: 'var(--paper)' }}
    >
      <div className="container">

        {/* Section header */}
        <RevealDiv style={{ marginBottom: '3rem' }}>
          <span className="label-caps">Portfolio</span>
          <hr className="hairline" style={{ marginTop: '0.75rem', marginBottom: '1.25rem', maxWidth: '2.5rem', borderColor: 'var(--accent)', borderWidth: '2px' }} />
          <h2
            id="work-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 700,
              color: 'var(--ink)',
              marginBottom: '0.75rem',
              lineHeight: 1.15,
            }}
          >
            Shipped Products
          </h2>
          <p style={{ fontSize: '1.0625rem', color: 'var(--muted)', maxWidth: '40rem', lineHeight: 1.65 }}>
            16 live web applications spanning healthcare, civic services, events management, and educational institutions.
          </p>
        </RevealDiv>

        {/* Category filters */}
        <RevealDiv delay={80} style={{ marginBottom: '2.5rem' }}>
          <div
            role="group"
            aria-label="Filter projects by category"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}
          >
            {PROJECT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`filter-btn${activeFilter === cat ? ' active' : ''}`}
                aria-pressed={activeFilter === cat}
                onClick={() => setActiveFilter(cat)}
              >
                {cat === 'All' ? 'All Projects' : cat}
                {cat === 'All' && (
                  <span style={{ marginLeft: '0.4rem', fontWeight: 400, color: 'inherit', opacity: 0.65 }}>
                    ({projects.length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </RevealDiv>

        {/* Result count */}
        <p
          aria-live="polite"
          aria-atomic="true"
          className="label-caps"
          style={{ marginBottom: '1.75rem' }}
        >
          Showing {filtered.length} of {projects.length} projects
        </p>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 20rem), 1fr))',
            gap: '1.5rem',
          }}
        >
          {filtered.map((project, i) => (
            <RevealDiv key={project.id} delay={Math.min(i * 50, 300)}>
              <ProjectCard project={project} />
            </RevealDiv>
          ))}
        </div>

        {filtered.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--muted)', padding: '3rem 0' }}>
            No projects found in this category.
          </p>
        )}
      </div>
    </section>
  );
}
