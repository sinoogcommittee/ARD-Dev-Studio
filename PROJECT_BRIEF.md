# Portfolio & Business Website Brief: ARD Dev Studio

## Goal

Create a visually memorable, high-performance portfolio and business platform for **ARD Dev Studio**, founded and led by **Anthony Riel C. Diango**. The site presents his **16 live software projects** as the primary proof of capability, establishing his credibility as a Computer Engineer and Full-Stack Developer with over a decade of IT systems and database operations experience, driving prospective clients and employers to open live projects or contact him directly.

## Audience and Desired Action

- **Primary audience**: Prospective clients, business owners, agencies, school administrators, and hiring teams.
- **Main action**: Open a live production project deployment or initiate a direct project discussion.
- **Secondary action**: Review his technical stack, employment history in government and education, and accredited credentials.

## Current Project Status: Phase 1-3 & Branding Complete (Ready for Phase 4 Deploy)

- **Visual Identity & Brand Assets**:
  - Official ARD 3D metallic monogram (`public/images/logo.jpg`) integrated into header navigation, browser favicon, and footer.
  - Official architectural blueprint seal (`public/images/logodesign.jpg`) showcased in the interactive Hero 3D tilt card, OpenGraph meta, and Twitter preview.
  - Premium dark editorial theme (`#101114` charcoal base, `#17191E` surfaces, `#D6AD63` warm gold accents, Space Grotesk / Inter / JetBrains Mono typography).
- **Motion-Intensive Features**:
  1. Interactive HTML5 ambient particle canvas with proximity filaments.
  2. Dynamic 3D card perspective tilt and cursor-following spotlight beam (`useMouseTilt`).
  3. Animated easing number counters for production metrics (`Counter.jsx`).
  4. Magnetic physics-based primary CTA buttons (`useMagnetic.js`).
  5. Cinematic architectural inspection dialog for detailed system inspection (`ProjectModal.jsx`).
  6. Smooth scroll choreography via `IntersectionObserver` (`useScrollReveal.jsx`).
- **Project Inventory**: All 16 live deployments from `CONTENT.md` operational with category filtering and instant keyword search.
- **Supabase Backend (Phase 3 Verified Live)**:
  - Database migration in `supabase/migrations/20261118000000_create_messages_table.sql`.
  - Connected and tested live against `https://ndwwoxsgcegdqiyoipvj.supabase.co`.
  - Strict Row-Level Security (RLS) enabling anonymous public inserts while blocking unauthorized read scraping.
  - Client helper gracefully falls back to direct mail client when unconfigured.
- **Hosting & Infrastructure**:
  - `render.yaml` Blueprint configured for static SPA deployment in Singapore region with SPA rewrites (`/*` -> `/index.html`) and security headers.
  - Hardened `.gitignore` protecting secrets, build output, and local state.
- **Quality Assurance**: 44/44 build audit checks passing, 3/3 Supabase tests passing, 100% data fidelity against `CONTENT.md`, zero compile errors.

## Immediate Next Steps (Phase 4 Launch)

1. **Push to Remote Git Repository**: Commit all changes and push `main` branch to GitHub.
2. **Deploy on Render**: Link the repository on Render via Blueprint (`render.yaml`).
3. **Set Production Environment Variables**: Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to the Render environment settings.
4. **Post-Deployment Smoke Test**: Verify live URL, contact form submission to Supabase, and live external links for all 16 projects.
