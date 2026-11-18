# ARD Dev Studio — Developer Portfolio & Systems Platform

<p align="center">
  <img src="public/images/logo.jpg" alt="ARD Dev Studio Logo" width="120" style="border-radius: 16px; border: 1px solid rgba(214,173,99,0.4);" />
</p>

<p align="center">
  <strong>Production Web Systems Engineering • 16 Live Deployed Applications • Enterprise Database Architecture</strong>
</p>

<p align="center">
  Built with <strong>React 18</strong>, <strong>Tailwind CSS</strong>, and <strong>Supabase</strong> by <strong>Anthony Riel C. Diango</strong> (Bohol, Philippines).
</p>

<p align="center">
  <a href="https://arddevstudio.onrender.com" target="_blank" rel="noopener noreferrer">
    <strong>🌐 Live Production Deployment: arddevstudio.onrender.com ↗</strong>
  </a>
</p>

---

## ⚡ Overview

**ARD Dev Studio** is the personal developer portfolio and business platform for **Anthony Riel C. Diango** — Computer Engineer, Full-Stack Web Developer, and Technical Systems Specialist with over a decade of IT infrastructure and database operations experience.

The site is built with a **project-first dark editorial aesthetic** (`#101114` charcoal, `#D6AD63` warm gold accents) and cinematic 60fps interaction design, presenting **16 live, production-deployed web applications** spanning four critical sectors:

1. **Healthcare & Business Operations** (e.g. *DentaPrime Clinic Portal*, *The Boarders App*)
2. **Civic, Government & Tourism** (e.g. *e-KUMBATI District Portal*, *Suroy Guindulman*)
3. **Events, Registration & Scoring** (e.g. *Sinoog 2027 Event Hub*, *Bohol Meet Scoring System*, *ExeCon Platform*)
4. **Education & Institutional Systems** (e.g. *Smart FTNHS Management*, *FerminExam Assessment*, *FTNHS Weather Hub*)

---

## 🚀 Key Features & Motion Architecture

- **Dark Editorial Visual Direction**: High-contrast typography (`Space Grotesk`, `Inter`, `JetBrains Mono`), deep slate surfaces, hairline borders, and luminous domain-specific glows.
- **Cinematic 60fps Motion (Zero Heavy Runtime Bloat)**:
  - **Ambient Particle Canvas** (`ParticleCanvas.jsx`): Interactive HTML5 canvas with filament proximity mesh.
  - **3D Perspective Mouse Tilt & Cursor Spotlight** (`useMouseTilt.js`): Card inclination with ray-traced lighting.
  - **Dynamic Metrics Counters** (`Counter.jsx`): Eased cubic counter animations for production stats.
  - **Magnetic Action Buttons** (`useMagnetic.js`): Cursor-following physics for primary CTAs.
  - **Architectural Inspection Modal** (`ProjectModal.jsx`): Deep-dive dialog with stack metadata, hosting telemetry, and verified HTTPS links.
- **Mobile-First Responsive Ergonomics**:
  - **Full-Screen 3D Art Landing**: On mobile and tablet portrait devices, the 3D brand seal commands the initial viewport height.
  - **Floating Glass Navigation Dock** (`MobileFloatingNav.jsx`): Replaces traditional hamburger menus with an ergonomic bottom dock featuring active scroll intersection tracking.
- **Built-in Studio Admin Portal** (`AdminPortal.jsx`):
  - In-app authenticated console (accessible via `#admin`, footer link, or `Ctrl+Shift+A`).
  - Read, filter, triage, reply to, and delete visitor inquiries submitted through the contact form.
  - Real-time availability status editor that updates the live website immediately without redeploying.
- **Strict Accessibility & Reduced-Motion Guarantees**:
  - Full support for `@media (prefers-reduced-motion: reduce)`.
  - Accessible keyboard navigation (`:focus-visible` gold outlines) and semantic HTML5 landmarks.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 18 (Vite 6 SPA bundler) |
| **Styling** | Tailwind CSS with centralized design tokens & custom utility keyframes |
| **Backend & Database** | Supabase (PostgreSQL with strict Row-Level Security) |
| **Authentication** | Supabase Auth (JWT-based role authentication for Studio Portal) |
| **Hosting & Deployment** | Render Static Web Service (`render.yaml` Blueprint) |
| **Typography** | Space Grotesk, Inter, JetBrains Mono (Google Fonts) |
| **Testing** | Node test suites for 1:1 factual fidelity and 44-point production bundle audits |

---

## 📂 Repository Structure

```text
Portfolio/
├── .env.example              # Environment variables template
├── .gitignore                # Hardened against credentials and build artifacts
├── render.yaml               # Render Infrastructure-as-Code Blueprint
├── index.html                # Dark theme root HTML with metadata and favicon
├── package.json              # Scripts and dependencies
├── tailwind.config.js        # Design tokens and theme configuration
├── audit-build.mjs           # Automated 44-point production bundle audit
├── test-verification.mjs     # 1:1 data integrity test suite against CONTENT.md
├── test-supabase-schema.mjs  # Migration syntax & RLS test suite
├── public/
│   └── images/
│       ├── logo.jpg          # Official 3D metallic ARD monogram emblem
│       ├── logodesign.jpg    # Architectural blueprint seal
│       └── ARDDevStudioLogo.png # Master graphic asset
├── src/
│   ├── App.jsx               # Root component orchestrating page landmarks
│   ├── index.css             # Design tokens and custom keyframe animations
│   ├── main.jsx              # Application entry point
│   ├── components/
│   │   ├── Header.jsx        # Sticky glass navigation bar
│   │   ├── Hero.jsx          # Hero section with portrait art first & side-by-side desktop
│   │   ├── ParticleCanvas.jsx# Interactive HTML5 ambient particle canvas
│   │   ├── Counter.jsx       # Eased number counter for production metrics
│   │   ├── ProjectGallery.jsx# Searchable, filterable gallery of all 16 live deployments
│   │   ├── ProjectCard.jsx   # 3D tilted card with cursor spotlight & live HTTPS link
│   │   ├── ProjectModal.jsx  # Dark glass architectural inspection dialog
│   │   ├── AboutSection.jsx  # Technical skills grid, timeline, and accredited qualifications
│   │   ├── ContactSection.jsx# Direct channels (Email, Phone, FB) & Supabase contact form
│   │   ├── Footer.jsx        # Semantic footer with brand badge, navigation, and copyright
│   │   ├── MobileFloatingNav.jsx # Bottom floating navigation dock for mobile and tablet
│   │   ├── AdminPortal.jsx   # Private console for inbox triage and live status updates
│   │   └── categoryMeta.js   # Domain accent colors, labels, and badges
│   ├── data/
│   │   ├── projects.js       # All 16 live deployments verified 1:1 with CONTENT.md
│   │   └── profile.js        # Centralized identity, verified contacts, skills, and history
│   ├── hooks/
│   │   ├── useScrollReveal.jsx # IntersectionObserver scroll reveal wrapper
│   │   ├── useMouseTilt.js     # 3D card perspective & cursor spotlight hook
│   │   ├── useMagnetic.js      # Elastic magnetic button attraction hook
│   │   └── useSiteSettings.js  # Live availability status synchronization hook
│   └── lib/
│       └── supabase.js       # Resilient Supabase client with safe unconfigured fallback
└── supabase/
    ├── README.md             # Supabase setup and migration guide
    └── migrations/
        ├── 20261118000000_create_messages_table.sql      # Contact messages table + RLS
        └── 20261118000001_create_site_settings_table.sql # Dynamic settings table + RLS
```

---

## 💻 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` or `pnpm`

### Installation
```bash
# Clone your repository
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:
```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Running Tests & Build Audits
```bash
# Run 1:1 data integrity and migration test suites
npm test

# Build production bundle
npm run build

# Run automated 44-point production audit
node audit-build.mjs
```

---

## 🗄️ Supabase Backend Setup

The contact form and dynamic availability status connect to your Supabase PostgreSQL database:

1. Open your Supabase project's **SQL Editor**.
2. Run the migrations in order:
   - [`supabase/migrations/20261118000000_create_messages_table.sql`](supabase/migrations/20261118000000_create_messages_table.sql)
   - [`supabase/migrations/20261118000001_create_site_settings_table.sql`](supabase/migrations/20261118000001_create_site_settings_table.sql)
3. Both tables enforce strict **Row-Level Security (RLS)**:
   - Public visitors can submit contact inquiries and read current availability status.
   - Only authenticated admin users can read, triage, or delete inquiries and update status.

---

## 🚢 Deploying to Render

This repository includes a production-ready Render Blueprint ([`render.yaml`](render.yaml)):

1. Push your repository to GitHub.
2. In the [Render Dashboard](https://dashboard.render.com/), click **New** → **Blueprint**.
3. Connect your repository. Render automatically configures:
   - **Service Name**: `arddevstudio`
   - **Environment**: Static Site
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `./dist`
   - **Region**: Singapore (`singapore`)
   - **SPA Routing**: Rewrites `/*` to `/index.html`
   - **Security Headers**: `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`
4. Add your environment variables in the Render Dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Click **Deploy**. Your site is now live at [https://arddevstudio.onrender.com](https://arddevstudio.onrender.com)!

---

## 📬 Contact & Inquiries

- **Email**: [rieldiango24@gmail.com](mailto:rieldiango24@gmail.com)
- **Phone / SMS**: [+63 960 676 8549](tel:+639606768549)
- **Facebook**: [facebook.com/realnariel](https://facebook.com/realnariel)
- **Location**: Guinacot, Guindulman, Bohol, Philippines

---

## 📄 License & Attribution

Copyright &copy; 2026 ARD Dev Studio • Anthony Riel C. Diango. All rights reserved.
