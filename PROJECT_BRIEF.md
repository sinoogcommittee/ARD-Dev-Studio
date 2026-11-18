# Portfolio & Business Website Brief: ARD Dev Studio

## Goal

Create a visually memorable, high-performance portfolio and business platform for **ARD Dev Studio**, founded and led by **Anthony Riel C. Diango**. The site presents his **16 live software projects** as the primary proof of capability, establishing his credibility as a Computer Engineer and Full-Stack Developer with over a decade of IT systems and database operations experience, driving prospective clients and employers to open live projects or contact him directly.

## Audience and Desired Action

- **Primary audience**: Prospective clients, business owners, agencies, school administrators, and hiring teams.
- **Main action**: Open a live production project deployment or initiate a direct project discussion.
- **Secondary action**: Review his technical stack, employment history in government and education, and accredited credentials.

## Current Project Status: Phase 1-4 Complete (Live in Production)

- **Live Production URL**: [https://arddevstudio.onrender.com](https://arddevstudio.onrender.com)
- **Visual Identity & Brand Assets**:
  - Official ARD 3D metallic monogram (`public/images/logo.jpg`) integrated into header navigation, browser favicon, and footer.
  - Official architectural blueprint seal (`public/images/logodesign.jpg`) showcased in the interactive Hero 3D tilt card, OpenGraph meta, and Twitter preview.
  - High-resolution master asset (`public/images/ARDDevStudioLogo.png`) preserved in repository.
  - Premium dark editorial theme (`#101114` charcoal base, `#17191E` surfaces, `#D6AD63` warm gold accents, Space Grotesk / Inter / JetBrains Mono typography).
- **Motion-Intensive Features**:
  1. Interactive HTML5 ambient particle canvas with proximity filaments.
  2. Dynamic 3D card perspective tilt and cursor-following spotlight beam (`useMouseTilt`).
  3. Animated easing number counters for production metrics (`Counter.jsx`).
  4. Magnetic physics-based primary CTA buttons (`useMagnetic.js`).
  5. Cinematic architectural inspection dialog for detailed system inspection (`ProjectModal.jsx`).
  6. Smooth scroll choreography via `IntersectionObserver` (`useScrollReveal.jsx`).
  7. Mobile-first full screen 3D art landing view and floating bottom navigation dock (`MobileFloatingNav.jsx`).
  8. Progressive Web App (PWA) installation with authentic circular app icon (`ARDDevStudioCircleLogo.png`), offline precaching, and native mobile install prompts (`InstallAppPrompt.jsx`).
- **Project Inventory**: All 16 live deployments from `CONTENT.md` operational with category filtering and instant keyword search.
- **Supabase Backend & Studio Portal**:
  - Connected and tested live against `https://ndwwoxsgcegdqiyoipvj.supabase.co`.
  - Database migration in `supabase/migrations/20261118000000_create_messages_table.sql`.
  - Dynamic availability status settings in `supabase/migrations/20261118000001_create_site_settings_table.sql`.
  - Private in-app Studio Admin Portal (`AdminPortal.jsx`) for 1-click message triage and real-time status updates without redeploying.
- **Hosting & Infrastructure**:
  - Successfully deployed on Render: `https://arddevstudio.onrender.com`.
  - `render.yaml` Blueprint configured with static SPA rewrites, caching headers, and security headers.
  - Hardened `.gitignore` protecting secrets and build state.
- **Quality Assurance**: 55/55 build audit checks passing, 3/3 Supabase tests passing, 100% data fidelity against `CONTENT.md`, zero compile errors.

## Post-Launch Operations

1. **Inquiries Management**: Use the in-app Studio Portal (`#admin` or footer button) to review incoming messages directly on `https://arddevstudio.onrender.com`.
2. **Dynamic Availability**: Toggle or update your status text anytime from the Studio Portal without code changes.
3. **Continuous Deployment**: Future Git commits pushed to `main` will automatically trigger fresh builds and deployments on Render.
