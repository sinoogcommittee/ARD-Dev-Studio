# Website Architecture

## Technical Stack

- **Framework**: React 18 with Vite for modern ES modules bundling.
- **Styling**: Tailwind CSS with custom design tokens for deep charcoal surfaces and warm-gold accents.
- **Motion & Interaction**: Native HTML5 Canvas, hardware-accelerated CSS keyframes, `IntersectionObserver` scroll choreography, 3D perspective mouse tilt, and magnetic physics without heavy third-party runtime bloat.
- **Backend Services**: Supabase (PostgreSQL, Row-Level Security, Auth, Storage) for optional contact messaging.
- **Deployment Target**: Render (or Vercel) for Vite static SPA hosting.

## Project Structure

```text
Portfolio/
├── .env.example              # VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY placeholders
├── index.html                # Dark theme root HTML with fonts and meta tags
├── package.json              # Scripts: dev, build, preview, test
├── tailwind.config.js        # Color and typography token mappings
├── audit-build.mjs           # Automated 44-point production bundle audit
├── test-verification.mjs     # 1:1 data integrity test suite against CONTENT.md
└── src/
    ├── App.jsx               # Root component orchestrating page landmarks
    ├── index.css             # Design tokens, motion keyframes, and utility classes
    ├── main.jsx              # Application entry point
    ├── components/
    │   ├── Header.jsx        # Sticky glass navigation with live availability & mobile drawer
    │   ├── Hero.jsx          # Cinematic hero with particle canvas & magnetic CTAs
    │   ├── ParticleCanvas.jsx# Interactive HTML5 ambient particle canvas
    │   ├── Counter.jsx       # Eased number counter for production metrics
    │   ├── ProjectGallery.jsx# Filterable, searchable gallery of all 16 deployments
    │   ├── ProjectCard.jsx   # 3D tilted card with cursor spotlight & live HTTPS link
    │   ├── ProjectModal.jsx  # Dark glass architectural inspection dialog
    │   ├── AboutSection.jsx  # Technical skills grid, timeline, and accredited credentials
    │   ├── ContactSection.jsx# Direct channels (Email, Phone, FB) & Supabase fallback form
    │   ├── Footer.jsx        # Semantic footer with navigation, location, and copyright
    │   └── categoryMeta.js   # Domain accent colors, labels, and badges
    ├── data/
    │   ├── projects.js       # All 16 live deployments verified 1:1 with CONTENT.md
    │   └── profile.js        # Centralized identity, verified contacts, skills, and history
    ├── hooks/
    │   ├── useScrollReveal.jsx # IntersectionObserver scroll reveal wrapper
    │   ├── useMouseTilt.js     # 3D card perspective & cursor spotlight hook
    │   └── useMagnetic.js      # Elastic magnetic button attraction hook
    └── lib/
        └── supabase.js       # Resilient Supabase client with safe unconfigured fallback
```

## Current Implementation Status

| Milestone | Status | Description |
|---|---|---|
| **Phase 1: Foundation & Data** | **Completed** | Vite + React + Tailwind scaffolded; 16 projects and profile centralized in `src/data/`; safe Supabase helper created; 1:1 verification test passing. |
| **Phase 2: Core Dark UI & Motion** | **Completed** | Full dark editorial theme implemented (`#101114`, `#D6AD63`); 5 cinematic motion modules active (3D tilt, particle canvas, counters, magnetic CTAs, modal); responsive mobile drawer; zero build errors. |
| **Phase 3: Supabase Backend** | **Completed & Verified Live** | SQL migration created; live database `https://ndwwoxsgcegdqiyoipvj.supabase.co` connected; live insert & RLS verified via `npm run test:live-supabase`. |
| **Phase 4: Deployment & DNS** | **In Progress** | `render.yaml` Blueprint configured with static build, SPA rewrite rules, security headers, and hardened `.gitignore`; ready to connect on Render. |

## Contact Form & Backend Resilience

- Direct contact via email (`rieldiango24@gmail.com`), phone (`+63 960 676 8549`), and Facebook (`facebook.com/realnariel`) remain primary and reliable.
- The contact form checks `isSupabaseConfigured`:
  - When configured: submits directly to Supabase `messages` table with validation.
  - When unconfigured: automatically operates in graceful fallback mode, preparing a direct `mailto:` draft with all user inputs so inquiries are never lost.

## Next Steps

1. **Supabase Schema Deployment**: Create and run the SQL migration script for the `messages` table with RLS enabled (allowing anonymous insert, restricting read/update/delete).
2. **Environment Variable Configuration**: Add real Supabase keys to `.env.local` to enable live database writes.
3. **Deployment Setup**: Add `render.yaml` or `vercel.json` SPA routing rewrites.
