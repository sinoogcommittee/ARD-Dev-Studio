import React from 'react';
import { projects, PROJECT_CATEGORIES } from './data/projects';
import { profile } from './data/profile';
import { isSupabaseConfigured } from './lib/supabase';

export default function App() {
  const featuredCount = projects.filter(p => p.featured).length;

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <header className="border-b border-neutral-800 pb-8 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
          {profile.identity.name}
        </h1>
        <p className="text-lg text-neutral-400 mb-4">{profile.identity.role}</p>
        <p className="text-sm text-neutral-500 mb-2">{profile.identity.location}</p>
        <p className="text-sm text-neutral-300 max-w-2xl">{profile.identity.summary}</p>

        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <a href={`mailto:${profile.contact.email}`} className="text-amber-400 hover:underline">
            {profile.contact.email}
          </a>
          <span className="text-neutral-600">•</span>
          <span className="text-neutral-300">{profile.contact.phone}</span>
          <span className="text-neutral-600">•</span>
          <a href={profile.contact.facebook} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">
            Facebook Profile
          </a>
        </div>

        <div className="mt-4 text-xs text-neutral-500">
          Supabase Status: {isSupabaseConfigured ? 'Connected' : 'Graceful Fallback Mode (Unconfigured)'}
        </div>
      </header>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            Structured Data Verification ({projects.length} Projects Loaded)
          </h2>
          <span className="text-xs bg-neutral-800 text-neutral-300 px-2.5 py-1 rounded">
            {featuredCount} Featured
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-4 rounded border border-neutral-800 bg-neutral-900/50 hover:border-neutral-700 transition"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-xs font-mono text-amber-500/90 bg-amber-500/10 px-2 py-0.5 rounded">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="text-[10px] uppercase tracking-wider text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                    Featured
                  </span>
                )}
              </div>
              <h3 className="font-medium text-white mb-1">{project.title}</h3>
              <p className="text-sm text-neutral-400 mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.stack.map((tag) => (
                  <span key={tag} className="text-xs text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-amber-400 hover:underline break-all"
              >
                {project.liveUrl} &rarr;
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
