# Portfolio Website Brief

## Goal

Create a visually memorable, high-performance personal portfolio for **Anthony Riel C. Diango** that presents his **16 live software projects** as the main attraction. The site establishes his credibility as a Computer Engineer and Full-Stack Developer with over a decade of IT systems and database operations experience, driving prospective clients and employers to open live projects or contact him directly.

## Audience and Desired Action

- **Primary audience**: Prospective clients, business owners, agencies, school administrators, and hiring teams.
- **Main action**: Open a live production project deployment or initiate a direct project discussion.
- **Secondary action**: Review his technical stack, employment history in government and education, and accredited credentials.

## Current Project Status: Phase 3 Completed

- **Visual Identity**: Premium dark editorial theme (`#101114` charcoal base, `#17191E` surfaces, `#D6AD63` warm gold accents, Space Grotesk / Inter / JetBrains Mono typography).
- **Motion-Intensive Features**:
  1. Interactive HTML5 ambient particle canvas with proximity filaments.
  2. Dynamic 3D card perspective tilt and cursor-following spotlight beam.
  3. Animated easing number counters for production metrics.
  4. Magnetic physics-based primary CTA buttons.
  5. Cinematic architectural inspection dialog for detailed system inspection.
  6. Smooth scroll choreography via `IntersectionObserver`.
- **Project Inventory**: All 16 live deployments from `CONTENT.md` operational with category filtering and instant keyword search.
- **Supabase Backend (Phase 3)**:
  - Database migration in `supabase/migrations/20261118000000_create_messages_table.sql`.
  - Strict Row-Level Security (RLS) enabling anonymous public inserts while restricting read/update/delete to authenticated admins.
  - Setup guide documented in `supabase/README.md`.
  - Client helper gracefully falls back to direct mail client when unconfigured.
- **Quality Assurance**: 44/44 build audit checks passing, 3/3 Supabase tests passing, 100% data fidelity against `CONTENT.md`, zero compile errors.

## Immediate Next Steps (Phase 4)

1. **Hosting Deployment**: Deploy frontend to Render (or Vercel) with SPA rewrite rules (`/*` -> `/index.html`).
2. **Production Smoke Testing**: Verify external HTTPS connectivity across all 16 live deployments and test form submission.
3. **Chrome DevTools Audit**: Run performance, accessibility (a11y), and Core Web Vitals checks.
