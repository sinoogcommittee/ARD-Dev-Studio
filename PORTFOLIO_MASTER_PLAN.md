# PORTFOLIO_MASTER_PLAN.md
# ARD Dev Studio — Anthony Riel C. Diango Portfolio & Business Platform

> **Document purpose:** Product, design, content, architecture, implementation, and deployment specification for a premium, cinematic personal portfolio website.
>
> **Status:** Active Implementation — Phase 1 (Foundation), Phase 2 (Dark Editorial UI & Motion), Phase 3 (Supabase Contact Backend), Brand Assets Integration (`public/images/logo.jpg`, `logodesign.jpg`), and Render Blueprint (`render.yaml`) Completed. Ready for Remote Git Push and Render Launch.
>
> **Primary audience:** Individuals, businesses, agencies, institutions, and organizations looking to hire a developer for websites, web applications, workflow systems, portals, dashboards, and custom software.
>
> **Source of truth:** `Diango_Resume.docx` uploaded by the owner, plus decisions explicitly confirmed in this conversation. Where the résumé does not provide a detail, this specification marks it as **TBD**, **to verify**, or a **proposal** rather than inventing it.

---

## 0. Confirmed project decisions

| Decision | Final selection | Implementation direction |
|---|---|---|
| Domain | Render subdomain | Launch with a Render-provided subdomain. A custom domain can be connected later without restructuring the application. |
| Theme | Dark | Premium dark editorial interface with restrained warm-gold accents. |
| Animation | Cinematic | Intentional, high-quality transitions, scroll choreography, layered reveals, and selected immersive project interactions. Motion must remain performant and accessible. |
| Structure | Hybrid | Immersive homepage plus dedicated project case-study routes. |
| Admin | Full | Authenticated CMS dashboard for portfolio content, projects, media, inquiries, and site settings. |
| Hosting | Render | Deploy the React/Vite frontend on Render. Use Supabase for database, authentication, and media storage. |
| Editor / workflow | VS Code | Local development, Git-based version control, environment variables, and documented setup. |
| Frontend | React + Vite | Component-based SPA with client-side routing. |
| Styling | Tailwind CSS | Centralized design tokens and reusable components. |
| Backend services | Supabase | PostgreSQL, Auth, Row Level Security, and Storage. |

### 0.1 Product principle

This is not a generic résumé website. It is a **project-first professional portfolio and lead-generation platform**. The projects are the primary proof of capability. The résumé supports credibility; the contact journey converts interest into an inquiry.

The site must quickly answer these visitor questions:

1. Who is Anthony and what kind of work does he do?
2. What real systems has he designed, built, and deployed?
3. What problems can he help solve?
4. What technologies and professional experience support his work?
5. How can a prospective client discuss a project or request a quotation?

### 0.2 Content integrity rules

- Treat the uploaded résumé as the authoritative source for personal details, employment history, education, listed technologies, and the 16 project names, URLs, and descriptions.
- Do not invent project outcomes, user counts, revenue, performance figures, client names, testimonials, awards, or project features.
- Do not imply that all 16 applications use the same stack. The résumé lists a broad set of technologies across the portfolio and identifies some projects or groups with specific stack context.
- Do not describe a project as open-source, client-owned, commercial, or personally commissioned unless confirmed.
- Do not publish confidential data, private dashboards, personal information of end users, or credentials in screenshots.
- Any project feature added later must be confirmed by the owner or demonstrated by the live application.
- Mark missing GitHub, LinkedIn, custom domain, profile photograph, project screenshots, detailed case-study narratives, and testimonials as **TBD** until supplied.

---

# 1. Brand and positioning

## 1.1 Name and professional identity

**Name:** Anthony Riel C. Diango

**Résumé headline:** FULL-STACK WEB DEVELOPER | TECHNICAL SUPPORT

**Recommended website positioning:**

> Full-Stack Web Developer building practical, production-ready web applications, portals, and digital systems.

Supporting statement:

> I help individuals, businesses, agencies, and organizations turn ideas, manual workflows, and operational challenges into usable digital products — from public-facing websites to data-driven applications and management systems.

This wording is a proposed website positioning based on the résumé. The résumé itself describes over a decade of combined experience in software engineering, web development, database systems administration, IT infrastructure, and technical instruction.

## 1.2 Primary conversion objective

The primary conversion is a qualified project inquiry through the website contact form.

Secondary conversion paths:

- Email Anthony directly.
- Call or message using the published phone number.
- Visit the Facebook profile.
- Open a live project deployment.
- Explore a project case study.
- Request a consultation or project discussion.

## 1.3 Intended audiences

| Audience | What they need to see | Desired action |
|---|---|---|
| Small and medium businesses | Websites, booking/management tools, dashboards, operational systems | Submit a project inquiry |
| Agencies and independent professionals | Reliable development support and implementation capability | Discuss collaboration |
| Schools and educational institutions | Assessment, school operations, weather/modality, and institutional systems | Request a system discussion |
| Government/community organizations | Portals, constituent workflows, directories, events, and coordination systems | Request a consultation |
| Event organizers and sports associations | Registration, participant management, scoring, tabulation, and results systems | Request a project discussion |
| Recruiters and employers | Experience, skills, education, and production work | Contact for opportunities |

## 1.4 Tone of voice

- Professional, confident, practical, and clear.
- Technical enough to establish competence, but understandable to nontechnical clients.
- Emphasize real applications and practical problem-solving.
- Avoid exaggerated claims such as “world-class,” “revolutionary,” “industry-leading,” or “guaranteed results.”
- Use first person for personal statements and concise descriptions.

---

# 2. Information architecture and sitemap

## 2.1 Public routes

| Route | Page | Purpose |
|---|---|---|
| `/` | Home | Immersive introduction, featured projects, services, credibility, and contact conversion |
| `/projects` | Projects | Searchable and filterable portfolio gallery |
| `/projects/:slug` | Project case study | Detailed explanation of one application |
| `/about` | About | Professional profile, experience, education, and technical background |
| `/services` | Services | Clearly explain the types of work prospective clients can request |
| `/contact` | Contact | Inquiry form and direct contact channels |
| `/privacy` | Privacy notice | Explain inquiry-form data handling |
| `*` | Not found | Helpful recovery path to projects and homepage |

The home page should be a rich single-page experience with anchor links to its major sections. The separate routes make the site easier to navigate, share, index, and expand.

## 2.2 Admin routes

| Route | Page |
|---|---|
| `/admin/login` | Admin authentication |
| `/admin` | Dashboard overview |
| `/admin/projects` | Project list and management |
| `/admin/projects/new` | Create project |
| `/admin/projects/:id` | Edit project |
| `/admin/categories` | Project categories |
| `/admin/technologies` | Technology catalog |
| `/admin/media` | Media library |
| `/admin/services` | Services management |
| `/admin/experience` | Employment history |
| `/admin/education` | Education and credentials |
| `/admin/testimonials` | Testimonials management |
| `/admin/inquiries` | Contact inquiries |
| `/admin/profile` | Public profile information |
| `/admin/social-links` | Social outlets |
| `/admin/settings` | Site settings, SEO defaults, and display preferences |

Admin pages must be protected. Public visitors must never see admin controls or be able to write directly to protected tables.

---

# 3. Public website page specifications

## 3.1 Global navigation

### Desktop

- Brand mark/name at the left.
- Navigation links: Work, Services, About, Contact.
- Primary CTA: **Start a Project**.
- Optional compact availability label, only if the owner confirms current availability.
- Sticky or intelligently compacting navigation after the hero.

### Mobile

- Compact brand identity.
- Menu button with accessible expanded/collapsed state.
- Clear contact CTA.
- Menu closes after navigation.
- Prevent horizontal overflow and avoid blocking the page with oversized navigation.

### Navigation behavior

- Smooth-scroll to homepage anchors when on `/`.
- If an anchor is selected from another route, navigate to `/` and then resolve the anchor.
- Indicate the current route or active section.
- Respect reduced-motion preferences.

## 3.2 Homepage hero

**Goal:** Establish identity and value immediately, then invite visitors to inspect the work.

Suggested content:

- Eyebrow: `FULL-STACK WEB DEVELOPER · TECHNICAL SUPPORT`
- Main heading: `I build digital systems that move ideas into action.`
- Supporting text: concise explanation of websites, web apps, portals, and custom workflow systems.
- Primary CTA: `Explore My Work`
- Secondary CTA: `Start a Project`
- Small proof points derived from the résumé:
  - `16+ Live Deployed Web Apps`
  - `10+ Years in IT Systems & Database Operations` (the résumé's wording; preserve the combined-experience context)
  - `Open to Project-Based, Freelance, Part-Time, or Full-Time Remote Roles` (publish only if still current)

### Visual direction

- Dark, editorial composition.
- Large typography and strong hierarchy.
- Restrained gold accent.
- Layered background details, subtle grid/noise, abstract technical geometry, or carefully selected project imagery.
- Avoid generic stock photos of people coding.
- Profile image is **TBD**. Do not generate or publish a fake portrait.
- Hero motion should support the message rather than delay access to it.

## 3.3 Featured projects

Show a curated selection of 4–6 projects, not all 16 at once.

Recommended initial featured candidates, subject to owner confirmation:

1. Sinoog 2027 Event Hub
2. Bohol Meet Scoring System
3. DentaPrime Clinic Portal
4. e-KUMBATI District Portal
5. Smart FTNHS Management
6. Suroy Guindulman

The list is a proposed editorial selection, not a ranking or claim of project importance.

Each project tile should include:

- Cover image or approved screenshot.
- Project name.
- Category.
- One-sentence verified summary.
- Up to three verified technology tags, if confirmed for that specific project.
- `View Case Study` link.
- `Visit Live Site` link when the deployment is publicly accessible and the owner approves the link.

Do not use fabricated screenshots or screenshots of unrelated products. Until screenshots are supplied, use a clearly designed neutral project cover with the project name and category.

## 3.4 Complete project gallery

The `/projects` route is the main portfolio catalog.

### Required features

- Grid/list presentation with responsive card layouts.
- Search by project name and summary.
- Filter by category.
- Optional technology filter only after project-to-technology assignments have been verified.
- Featured and recently updated markers controlled by CMS.
- Sort order controlled by admin.
- Empty search state and no-results state.
- Pagination or “Load more” if the catalog grows substantially.

### Project card data

- Name
- Slug
- Category
- Short description
- Cover image
- Featured flag
- Display order
- Published status
- Live URL
- Case-study availability

## 3.5 Project case-study template

Every project gets a route at `/projects/:slug`.

### Recommended case-study structure

1. **Project introduction**
   - Name
   - Category
   - Short verified description
   - Live deployment link
   - Approved cover image
2. **Overview**
   - What the system is
   - Intended audience or operational context, if confirmed
3. **Problem or need**
   - The problem the project was designed to address
   - Must be supplied or confirmed by the owner
4. **Solution**
   - How the application addresses the need
   - Use only verified information
5. **Key capabilities**
   - Feature list grounded in the résumé, owner confirmation, or direct inspection
6. **Screens and workflow**
   - Screenshots, annotated UI, or short demo video
   - Remove private or sensitive data
7. **Technology**
   - Project-specific technologies, not the entire résumé stack
8. **Implementation notes**
   - Architecture, integrations, data model, or challenges where the owner provides details
9. **Outcome**
   - Only publish measurable outcomes when supported by reliable data
10. **Next/related projects**
11. **CTA**
   - `Have a project like this? Let's talk.`

### Missing content policy

For each case study, create fields that can remain unpublished until completed. Do not show empty headings or generic filler on the public page. A project can still appear in the gallery with a concise verified description and live link even if its full case study is not yet ready.

## 3.6 Services page

The résumé supports the following service areas as reasonable offerings, but the owner must confirm exact commercial scope, pricing, and availability before publication.

### Proposed service catalog

1. **Business Websites**
   - Responsive public-facing websites and landing pages.
   - Content structure, contact pathways, and basic SEO foundations.
2. **Custom Web Applications**
   - Browser-based tools tailored to a business or organization workflow.
3. **Management Systems and Dashboards**
   - Data-driven portals, admin interfaces, and operational dashboards.
4. **Registration and Event Platforms**
   - Registration, participant administration, scheduling, scoring, and results workflows where applicable.
5. **Database-Driven Applications**
   - Data modeling, PostgreSQL/Supabase-backed applications, and role-aware access.
6. **Legacy .NET / Desktop / Technical Support**
   - Only describe specific deliverables after confirming the services Anthony wants to offer.
7. **Maintenance and Improvement**
   - Bug fixing, enhancements, and ongoing support, subject to agreed scope.

Each service should explain:
- Who it helps.
- The problem it can address.
- Typical deliverables.
- A clear inquiry CTA.

Do not publish fixed prices until the owner supplies pricing policy.

## 3.7 About page / homepage about section

Use résumé facts:

- Computer Engineer.
- Full-Stack Web Developer and Technical Support.
- Over a decade of combined experience across software engineering, web development, database systems administration, IT infrastructure, and technical instruction.
- BS in Computer Engineering.
- Experience in government, education, and technical service roles.
- Has architected and deployed 16+ live production web applications, as stated in the résumé.
- Uses AI-assisted engineering workflows, including VS Code and Google Antigravity, as stated in the résumé.

Suggested narrative should be written in first person after owner review. Avoid claiming that AI tools independently built the projects; the résumé presents them as part of the owner's engineering workflow.

## 3.8 Experience section

Preserve the résumé's titles, dates, organizations, and descriptions.

### Secondary School Teacher I (SST-I) — Computer Programming (Java & .NET Technology)
**August 2024 – Present**  
Department of Education (DepEd) — Fermin Tayabas National High School, Cabayugan, Calape, Bohol

Résumé responsibilities:
- Teach Senior High School TECHPRO / TVL-ICT Computer Programming tracks covering web fundamentals, object-oriented software development, database design, and enterprise application architecture using Java and .NET Technology.
- Architect and deploy production web applications that automate school assessments, weather-driven learning modality decisions, and multi-district athletic tournaments.
- Translate complex technical workflows into clear, structured documentation and maintainable codebases.

### Computer Technologist
**May 2015 – March 2024**  
Department of Agriculture Regional Field Office VIII — Tacloban City, Leyte

Résumé responsibilities:
- Designed, built, and maintained custom database software for the Bottom-Up Budgeting (BUB) Program and regional procurement tracking systems.
- Administered MIS Procurement System workflows, validated digital submissions, and managed online central-office reporting portals.
- Provided Tier-2 technical support, hardware/software upgrades, LAN/WAN network configuration, and preventive maintenance across regional operating units.

### Technical Service Engineer
**October 2013 – May 2015**  
Business Machines Corporation — Cagayan de Oro City, Misamis Oriental

Résumé responsibilities:
- Deployed, configured, and troubleshot commercial Point-of-Sale (POS) software, biometric systems, CCTV networks, and enterprise office hardware.
- Conducted client technical onboarding, user training seminars, and structured cabling for local area networks.

## 3.9 Education, certifications, and eligibility

Use the exact résumé entries:

- **Bachelor of Science in Computer Engineering** — Bohol Island State University – Main Campus, Tagbilaran City; Graduated March 2013.
- **Bachelor of Secondary Education (Qualifying)** — University of Bohol (UB), Tagbilaran City; 2021–2022.
- **TESDA NC II – Computer Systems Servicing**
- **Python Essentials 1 (Cisco Networking Academy)**
- **Licensure Examination for Teachers**
- **CSC Career Service Professional Eligibility**

Do not change “Bachelor of Secondary Education (Qualifying)” to a completed degree. Do not infer dates for certifications or examination results not supplied in the résumé.

## 3.10 Skills and technology section

Group the résumé's skills as follows.

### Web Frontend & UI/UX
- HTML5
- CSS3
- JavaScript (ES6+ / DOM / Fetch API)
- React
- Tailwind CSS
- Responsive Mobile-First Design
- Interactive Dashboards

### Backend & Languages
- Supabase (PostgreSQL, Auth, Row-Level Security, Storage)
- ASP.NET Core MVC
- C#
- Java (Spring Boot, JavaFX, Swing)
- Python
- C/C++

### Cloud Hosting & APIs
- Render
- Vercel
- Somee (.NET Hosting)
- Cloudflare R2 Media Optimization
- REST API & Payment Gateway Integrations

### IT Systems & Operations
- Database Architecture & MIS Administration
- Livestreaming & Digital Portals
- POS & Biometrics Deployment
- LAN/WAN Networking

Only use a technology badge on an individual project page when its use on that project is verified.

## 3.11 Contact page and conversion form

### Verified contact information

- **Email:** rieldiango24@gmail.com
- **Phone:** +63 960 676 8549
- **Facebook:** `https://facebook.com/realnariel`
- **Location:** Guinacot, Guindulman, Bohol, Philippines

### Social outlets

- Facebook: supplied in résumé.
- GitHub: **TBD — URL not supplied**.
- LinkedIn: **TBD — URL not supplied**.
- Other portfolio/social channels: **TBD**.

Do not create links to guessed profiles or handles.

### Inquiry form fields

Required:
- Full name
- Email address
- Project type
- Brief project description

Optional:
- Organization / business
- Phone or preferred contact
- Estimated budget range
- Desired timeline
- Reference URL

Project type options can include:
- Business website
- Custom web application
- Management system / dashboard
- Event or registration platform
- Education / institutional system
- Technical support / maintenance
- Other

Budget and timeline values should be broad selectable ranges and must be configurable. Avoid making them mandatory.

### Form behavior

- Validate fields on client and server/database boundary.
- Show clear sending, success, and failure states.
- Store submissions in Supabase.
- Send an email notification using a server-side provider or secure server function once an email service is selected.
- Never expose email-service credentials in frontend code.
- Add a honeypot field and rate-limiting / anti-spam strategy.
- Provide a direct email fallback.
- Do not silently discard failed submissions.
- Add consent text and link to the privacy notice.

### Conversion CTAs

Use consistent language:
- Start a Project
- Discuss Your Project
- Request a Consultation
- Send an Inquiry
- Email Me

Avoid multiple competing primary CTAs in the same viewport.

## 3.12 Testimonials

The résumé does not provide testimonials. Build CMS capability, but keep the public testimonials section hidden until genuine, permissioned testimonials are supplied.

Required fields:
- Person's name
- Role / organization
- Testimonial text
- Optional photo or logo
- Permission confirmation
- Display order
- Published status

Never fabricate testimonials or attribute statements to real people without permission.

## 3.13 FAQ

FAQ content is proposed and must be approved. Suggested questions:
- What kinds of websites or systems do you build?
- Can you build a system around an existing workflow?
- Do you work with schools, businesses, and organizations?
- Can you improve or maintain an existing application?
- How does a project usually begin?
- How can I request a quotation?

Do not promise fixed turnaround times, support windows, or pricing before these are confirmed.

---

# 4. Complete project inventory — 16 deployed applications

The following project names, deployment hosts, and system descriptions are transcribed from the résumé. Use HTTPS when linking if the deployment supports it; verify each URL before publication. The exact project stack, detailed features, ownership/role, and case-study information may require further confirmation.

## 4.1 Healthcare & Business Operations SaaS

### 1. DentaPrime Clinic Portal
- **Deployment:** `https://dentaprimedemo.onrender.com`
- **Résumé description:** Dental clinic management system featuring patient scheduling, treatment tracking, and service catalog.
- **Category:** Healthcare & Business Operations
- **Case-study details still needed:** Owner's role, detailed modules, user roles, screenshots, technology assignment, implementation challenges, and measurable outcomes.

### 2. The Boarders App
- **Deployment:** `https://theboarders.onrender.com`
- **Résumé description:** Collaborative management and automated expense-splitting web application for shared households.
- **Category:** Healthcare & Business Operations (portfolio group heading in résumé: Healthcare & Business Operations SaaS; individual app is a shared-household application)
- **Case-study details still needed:** Exact expense workflows, member roles, settlement logic, screenshots, technology assignment, and outcomes.

## 4.2 Civic, Government & Tourism Portals

### 3. e-KUMBATI District Portal
- **Deployment:** `https://ekumbatidemo.onrender.com`
- **Résumé description:** Constituent services platform with program tracking, action-center request workflows, and directory tools.
- **Category:** Civic, Government & Tourism
- **Case-study details still needed:** Service catalog, workflow details, user roles, screenshots, technology assignment, and outcomes.

### 4. Suroy Guindulman
- **Deployment:** `https://suroyguindulman.onrender.com`
- **Résumé description:** Municipal tourism discovery web portal showcasing destinations, itineraries, and local guides.
- **Category:** Civic, Government & Tourism
- **Case-study details still needed:** Destination content model, itinerary functions, local guide workflows, screenshots, technology assignment, and outcomes.

## 4.3 Event Management, Registration & Live Scoring Engines

### 5. Sinoog 2027 Event Hub
- **Deployment:** `https://sinoog2027.onrender.com`
- **Résumé description:** Event registration, participant management, and operational dashboard built on React & Supabase.
- **Category:** Event Management, Registration & Live Scoring
- **Verified stack from résumé:** React, Supabase.
- **Case-study details still needed:** Registration process, roles, dashboard modules, event workflows, screenshots, and outcome data.

### 6. ExeCon 2026 Platform
- **Deployment:** `https://execon.onrender.com`
- **Résumé description:** Conference and executive event logistics, scheduling, and attendee management web app.
- **Category:** Event Management, Registration & Live Scoring
- **Case-study details still needed:** Schedule management, attendee workflows, roles, screenshots, technology assignment, and outcomes.

### 7. Bohol Meet Scoring System
- **Deployment:** `https://boholmeet.onrender.com`
- **Résumé description:** Real-time provincial athletic tournament scoring, medal tallying, and event results portal.
- **Category:** Event Management, Registration & Live Scoring
- **Case-study details still needed:** Sports/event data model, scoring workflow, result validation, user roles, screenshots, technology assignment, and outcome data.

### 8. Congressional Meet Portal
- **Deployment:** `https://congmeet.onrender.com`
- **Résumé description:** Multi-municipality sports competition management and live tabulation system.
- **Category:** Event Management, Registration & Live Scoring
- **Case-study details still needed:** Municipality/team structure, tabulation workflows, event modules, screenshots, technology assignment, and outcomes.

### 9. Calape District Meet
- **Deployment:** `https://calapedistrictmeet.onrender.com`
- **Résumé description:** District-level athletic scoring engine streamlining event encoding and standings.
- **Category:** Event Management, Registration & Live Scoring
- **Case-study details still needed:** Event encoding workflow, standings logic, roles, screenshots, technology assignment, and outcomes.

### 10. Locatu Meet System
- **Deployment:** `https://locatumeet.onrender.com`
- **Résumé description:** Dedicated sports meet results and event coordination web application.
- **Category:** Event Management, Registration & Live Scoring
- **Case-study details still needed:** Event coordination workflows, results structure, roles, screenshots, technology assignment, and outcomes.

### 11. Abigail & Wilt Wedding Hub
- **Deployment:** `https://abigailandwilt.onrender.com`
- **Résumé description:** Interactive event logistics, digital invitation, and personalized RSVP web platform.
- **Category:** Event Management, Registration & Live Scoring
- **Case-study details still needed:** Invitation experience, RSVP flow, guest lookup, admin workflows, screenshots, technology assignment, and outcome data.

## 4.4 Education, Assessment & Institutional Systems

### 12. Smart FTNHS Management
- **Deployment:** `https://smartftnhs.onrender.com`
- **Résumé description:** Comprehensive school operations hub built with React, Tailwind CSS, and Supabase.
- **Category:** Education, Assessment & Institutional Systems
- **Verified stack from résumé:** React, Tailwind CSS, Supabase.
- **Case-study details still needed:** Specific modules, user roles, operational workflows, screenshots, and outcomes.

### 13. FTNHS Web Portal (.NET)
- **Deployment:** `https://ftnhs.somee.com`
- **Résumé description:** Institutional school web application engineered using .NET Technology and hosted on Somee.
- **Category:** Education, Assessment & Institutional Systems
- **Verified technology/hosting from résumé:** .NET Technology; Somee hosting.
- **Case-study details still needed:** Portal modules, roles, screenshots, exact .NET stack/version, and outcomes.

### 14. FerminExam Assessment
- **Deployment:** `https://ferminexam.onrender.com`
- **Résumé description:** Digital examination, automated grading, and student assessment web application.
- **Category:** Education, Assessment & Institutional Systems
- **Case-study details still needed:** Exam creation, question types, grading rules, roles, screenshots, technology assignment, and outcomes.

### 15. FTNHS Weather Hub
- **Deployment:** `https://ftnhsweatherhub.onrender.com`
- **Résumé description:** Automated decision-support dashboard determining learning modalities from weather thresholds.
- **Category:** Education, Assessment & Institutional Systems
- **Case-study details still needed:** Weather source, thresholds, decision rules, roles, screenshots, technology assignment, and outcomes.

### 16. FTNHS Tinabangay Portal
- **Deployment:** `https://ftnhstinabangay.onrender.com`
- **Résumé description:** School-community support, outreach, and resource coordination platform.
- **Category:** Education, Assessment & Institutional Systems
- **Case-study details still needed:** Outreach workflows, resource coordination, roles, screenshots, technology assignment, and outcomes.

### 4.5 Inventory implementation rules

- Seed all 16 records into the database.
- Keep all 16 available in the public gallery after each deployment URL has been checked.
- Set `is_published` independently from `is_featured`.
- A project may be published without a completed long-form case study.
- The `project_category` grouping above follows the résumé's headings. The Boarders App's specific function should be accurately described as a shared-household application.
- Use stable slugs such as `dentaprime-clinic-portal`, `the-boarders-app`, `e-kumbati-district-portal`, `suroy-guindulman`, `sinoog-2027-event-hub`, `execon-2026-platform`, `bohol-meet-scoring-system`, `congressional-meet-portal`, `calape-district-meet`, `locatu-meet-system`, `abigail-and-wilt-wedding-hub`, `smart-ftnhs-management`, `ftnhs-web-portal`, `ferminexam-assessment`, `ftnhs-weather-hub`, and `ftnhs-tinabangay-portal`.
- Verify every external URL and its current availability before launch. A résumé URL is not proof that a deployment remains online.

---

# 5. Visual design system

## 5.1 Art direction

**Direction:** Premium dark editorial / cinematic technology portfolio.

The design should feel custom, polished, and deliberate — not like a generic developer template.

### Design principles

- Large editorial typography.
- Clear hierarchy and generous spacing.
- Deep charcoal surfaces rather than pure black everywhere.
- Warm muted gold used as a highlight, not as a dominant fill.
- Project screenshots as the primary visual evidence.
- Strong layout rhythm with occasional asymmetry.
- Subtle borders and surface elevation.
- Minimal gradients, glow, and blur; use only when they improve hierarchy.
- Motion should create continuity and focus, not visual noise.

## 5.2 Initial color tokens

These are proposed starting tokens and should be refined during implementation.

| Token | Hex | Usage |
|---|---|---|
| `background` | `#101114` | Main page background |
| `surface` | `#17191E` | Cards and panels |
| `surface-elevated` | `#1E2127` | Dialogs and elevated panels |
| `accent-gold` | `#D6AD63` | Primary accent, selected states, key highlights |
| `text-primary` | `#F2F0EB` | Main text |
| `text-secondary` | `#A1A1AA` | Supporting text |
| `border-subtle` | `#292C32` | Dividers and card borders |
| `success` | Semantic green | Successful form/status states |
| `warning` | Semantic amber | Warning states |
| `danger` | Semantic red | Errors and destructive actions |

Semantic colors must remain distinguishable from the brand accent and meet contrast requirements.

## 5.3 Typography

Suggested type system:
- Display / headings: Space Grotesk or Sora.
- Body: Inter or Geist.
- Technical labels / metadata: JetBrains Mono.

Use licensed/hosted font sources appropriately and provide system fallbacks. Avoid using too many typefaces.

## 5.4 Shape, spacing, and surfaces

- Use a consistent spacing scale.
- Use restrained corner radii; avoid rounding every element excessively.
- Project cards may use larger radii than buttons and form controls.
- Keep text line lengths comfortable.
- Use thin borders and subtle surface contrast to define structure.
- Ensure focus indicators are visible against dark backgrounds.

## 5.5 Iconography

Use Lucide React or a consistent icon set. Do not mix unrelated icon styles. Icons should supplement text, not replace accessible labels.

## 5.6 Image treatment

- Use real screenshots and approved project imagery.
- Prefer WebP or AVIF for raster assets.
- Use responsive image sizes and lazy loading below the fold.
- Provide meaningful alt text.
- Do not use project screenshots as decorative backgrounds if text legibility suffers.
- Do not show private records, real student details, patient details, or confidential operational information.

---

# 6. Motion and interaction specification

## 6.1 Motion philosophy

The site is cinematic, but not a motion demo at the expense of usability. Motion should guide attention, reveal hierarchy, and make the project gallery memorable.

Recommended tools:
- **GSAP + ScrollTrigger:** complex scroll choreography, pinned sequences, timelines, and advanced section transitions.
- **Motion for React:** component-level entrance/exit, hover/tap states, dialogs, menus, and small transitions.
- **Lenis (optional):** smooth scrolling only if it remains compatible with browser behavior, accessibility, and ScrollTrigger integration.

Do not add all animation libraries without need. Keep one clear motion architecture and avoid competing scroll systems.

## 6.2 Motion moments

### Hero
- Staged reveal of eyebrow, headline, supporting text, and CTAs.
- Subtle background parallax or layered movement.
- No long intro that blocks access to the site.
- Avoid forced loading screens unless there is a genuine loading requirement.

### Navigation
- Compact transition on scroll.
- Active section indicator.
- Mobile menu with short, accessible transitions.

### Project gallery
- Cards reveal as they enter the viewport.
- Hover may reveal secondary metadata or a preview treatment.
- Avoid requiring hover to access essential information.
- Use subtle image scale/clip transitions.

### Case studies
- Hero image reveal.
- Section-by-section content transitions.
- Optional pinned visual narrative on wide screens only when it improves the story.
- Mobile should use normal document flow.

### Contact
- Form fields and confirmation states transition gently.
- No animation may prevent submission or keyboard use.

## 6.3 Motion timing guidance

Suggested initial ranges:
- Micro-interaction: 120–220 ms.
- Standard UI transition: 180–320 ms.
- Section reveal: 450–800 ms.
- Hero choreography: approximately 700–1,200 ms total sequence, not per element.
- Scroll-linked movement: continuous but restrained.

These are implementation starting points, not mandatory fixed values.

## 6.4 Accessibility and reduced motion

- Detect `prefers-reduced-motion`.
- Disable or substantially reduce parallax, pinned scenes, large transforms, and nonessential transitions for reduced-motion users.
- Never communicate state using motion alone.
- Ensure scroll-triggered content remains visible if JavaScript or animation fails.
- Avoid scroll hijacking.
- Avoid flashing and rapid repeated movement.
- Keep keyboard focus stable during animated route changes.
- Ensure animation does not cause layout shifts or obscure content.

## 6.5 Performance rules

- Animate `transform` and `opacity` where possible.
- Avoid continuous layout-triggering animations.
- Use `will-change` sparingly.
- Clean up GSAP timelines, ScrollTriggers, and event listeners on unmount.
- Dynamically import heavy animation modules where appropriate.
- Provide static fallback rendering.
- Test on mid-range mobile devices, not only a desktop development machine.

---

# 7. Responsive behavior

Breakpoints should follow content needs and Tailwind defaults unless the design requires custom tokens.

## Mobile-first requirements

- No horizontal overflow.
- Hero headline scales fluidly and wraps intentionally.
- Project gallery becomes a single-column or compact two-column layout depending on width.
- Case-study pinned scenes become normal stacked content.
- Navigation becomes a mobile menu.
- Contact form uses full-width controls.
- Touch targets should be comfortably sized (target approximately 44 × 44 CSS pixels).
- Avoid tiny metadata and excessively dense project cards.
- Use optimized mobile image variants.
- Test portrait and landscape orientations.

## Tablet

- Two-column project grids where space allows.
- Keep hero composition balanced.
- Avoid desktop-only hover interactions.
- Admin tables should become responsive cards or use intentional horizontal scrolling with clear affordances.

## Desktop and large displays

- Use a constrained content width for readable text.
- Allow selected hero and project compositions to use the available canvas.
- Use asymmetrical layouts sparingly.
- Do not stretch body copy across very wide screens.

---

# 8. Recommended technical architecture

## 8.1 Stack

### Required
- VS Code
- React
- Vite
- Tailwind CSS
- Supabase
- Render
- Git and GitHub repository (repository URL is **TBD**)

### Recommended supporting packages
- `react-router-dom` — route management.
- `@supabase/supabase-js` — Supabase client.
- `gsap` and `@gsap/react` — cinematic scroll motion.
- `motion` — component-level animation.
- `lucide-react` — icons.
- `react-hook-form` — form state.
- `zod` — validation schemas.
- `@hookform/resolvers` — React Hook Form integration.
- A small toast/notification library, or a custom accessible notification component.
- A metadata solution appropriate to the selected React routing/rendering strategy.

Choose compatible stable versions at project initialization and record them in the lockfile. Do not blindly copy version numbers from this document.

## 8.2 Rendering and SEO consideration

A Vite React SPA can be deployed on Render, but client-rendered pages need careful SEO handling. At minimum:
- Unique title and description per route.
- Canonical URLs.
- Open Graph and social metadata.
- Sitemap and robots file.
- Correct SPA fallback configuration.
- Structured data where appropriate.

If search visibility for individual project case studies is a major priority, evaluate prerendering or a React framework with server rendering before the build is too advanced. This is an architecture decision to confirm early; do not assume a client-only SPA provides the same crawl behavior as server-rendered pages.

## 8.3 Suggested folder structure

```text
portfolio/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── images/
│   └── fonts/
├── src/
│   ├── app/
│   │   ├── App.jsx
│   │   ├── router.jsx
│   │   └── providers/
│   ├── assets/
│   ├── components/
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── motion/
│   │   ├── projects/
│   │   ├── forms/
│   │   ├── ui/
│   │   └── seo/
│   ├── features/
│   │   ├── projects/
│   │   ├── contact/
│   │   ├── profile/
│   │   ├── services/
│   │   └── admin/
│   ├── hooks/
│   ├── lib/
│   │   ├── supabase.js
│   │   ├── validation/
│   │   └── utils/
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── ProjectsPage.jsx
│   │   ├── ProjectDetailPage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── ServicesPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── PrivacyPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── admin/
│   │   ├── layout/
│   │   ├── pages/
│   │   ├── components/
│   │   └── hooks/
│   ├── styles/
│   │   ├── index.css
│   │   └── tokens.css
│   └── main.jsx
├── supabase/
│   ├── migrations/
│   ├── seed.sql
│   └── config.toml
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

The exact Tailwind configuration file structure may differ by Tailwind version. Follow the installed version's current setup instructions.

## 8.4 Component design principles

- Components should have a clear responsibility.
- Keep data access out of large presentation components.
- Separate public and admin layouts.
- Reuse design primitives for buttons, fields, cards, dialogs, badges, and empty states.
- Avoid a single giant homepage component.
- Use semantic HTML.
- Use stable keys for list rendering.
- Keep form validation schemas reusable.
- Centralize route names and shared constants.
- Avoid unnecessary global state; use local state or focused context where appropriate.

---

# 9. Supabase data architecture

The full CMS requires structured, relational data rather than hardcoded portfolio content.

## 9.1 Core tables

### `profiles`
Stores public owner profile details.

Suggested columns:
- `id` UUID primary key
- `full_name` text
- `headline` text
- `short_bio` text
- `long_bio` text nullable
- `location` text
- `email` text
- `phone` text
- `profile_image_path` text nullable
- `resume_file_path` text nullable
- `availability_text` text nullable
- `updated_at` timestamptz

Seed only résumé-verified fields. Availability text must be reviewed before publishing.

### `projects`
Stores the 16 project records and future projects.

Suggested columns:
- `id` UUID primary key
- `name` text not null
- `slug` text unique not null
- `short_description` text not null
- `overview` text nullable
- `problem_statement` text nullable
- `solution` text nullable
- `outcome` text nullable
- `live_url` text nullable
- `repository_url` text nullable
- `cover_media_id` UUID nullable
- `category_id` UUID nullable
- `is_featured` boolean default false
- `is_published` boolean default false
- `display_order` integer default 0
- `case_study_enabled` boolean default false
- `published_at` timestamptz nullable
- `created_at` timestamptz
- `updated_at` timestamptz

`repository_url` must remain null until supplied and verified.

### `project_categories`
- `id` UUID primary key
- `name` text unique
- `slug` text unique
- `description` text nullable
- `display_order` integer
- `is_published` boolean

Seed the four résumé groupings.

### `project_features`
- `id` UUID primary key
- `project_id` UUID foreign key
- `title` text
- `description` text nullable
- `display_order` integer

Only store confirmed features.

### `technologies`
- `id` UUID primary key
- `name` text unique
- `slug` text unique
- `category` text nullable
- `icon_key` text nullable

### `project_technologies`
Many-to-many junction:
- `project_id` UUID foreign key
- `technology_id` UUID foreign key
- Composite primary key (`project_id`, `technology_id`)

Only create project assignments after verification.

### `project_media`
- `id` UUID primary key
- `project_id` UUID foreign key
- `storage_path` text
- `alt_text` text
- `caption` text nullable
- `media_type` text
- `display_order` integer
- `is_cover` boolean
- `is_published` boolean
- `created_at` timestamptz

### `services`
- `id` UUID primary key
- `title` text
- `slug` text unique
- `summary` text
- `description` text nullable
- `icon_key` text nullable
- `display_order` integer
- `is_published` boolean

### `experiences`
- `id` UUID primary key
- `role_title` text
- `organization` text
- `location` text nullable
- `start_date` date nullable
- `end_date` date nullable
- `is_current` boolean
- `description` text nullable
- `display_order` integer

Store the four résumé positions with the exact titles and dates. The current role should have `is_current = true`.

### `experience_bullets`
- `id` UUID primary key
- `experience_id` UUID foreign key
- `content` text
- `display_order` integer

### `education`
- `id` UUID primary key
- `qualification` text
- `institution` text
- `location` text nullable
- `start_date` date nullable
- `end_date` date nullable
- `completion_note` text nullable
- `display_order` integer

### `certifications`
- `id` UUID primary key
- `name` text
- `issuer` text nullable
- `date_earned` date nullable
- `credential_url` text nullable
- `display_order` integer

Do not invent issue dates or credential URLs.

### `testimonials`
- `id` UUID primary key
- `person_name` text
- `role_or_organization` text nullable
- `quote` text
- `image_path` text nullable
- `permission_confirmed` boolean default false
- `is_published` boolean default false
- `display_order` integer

Require permission confirmation before publishing.

### `inquiries`
- `id` UUID primary key
- `full_name` text not null
- `email` text not null
- `organization` text nullable
- `phone` text nullable
- `project_type` text not null
- `budget_range` text nullable
- `timeline` text nullable
- `reference_url` text nullable
- `message` text not null
- `status` text default `new`
- `admin_notes` text nullable
- `created_at` timestamptz
- `updated_at` timestamptz

Public clients must not be able to read inquiries or admin notes.

### `social_links`
- `id` UUID primary key
- `platform` text
- `label` text
- `url` text
- `icon_key` text nullable
- `display_order` integer
- `is_published` boolean

Seed Facebook only. GitHub and LinkedIn remain absent until confirmed.

### `site_settings`
- `key` text primary key
- `value` jsonb
- `updated_at` timestamptz

Use for site title, SEO defaults, CTA labels, footer details, and configurable display preferences. Avoid storing secrets here.

## 9.2 Indexes and constraints

Recommended:
- Unique index on `projects.slug`.
- Index on `projects.is_published`, `projects.is_featured`, `projects.display_order`.
- Index on `projects.category_id`.
- Index on `project_media.project_id`, `project_media.display_order`.
- Index on `inquiries.created_at`, `inquiries.status`.
- Index on `experiences.display_order`, `education.display_order`.
- Foreign keys with deliberate delete behavior.
- Check constraint for allowed inquiry statuses.
- Check constraint for valid project URLs where practical.
- Required fields and unique slugs enforced at database level, not only in the UI.

Use transactions for multi-table operations such as updating a project and its technology assignments.

## 9.3 Row Level Security

Enable RLS on all tables exposed through the Supabase API.

### Public read policies
Anonymous visitors may read only published public content:
- Published projects.
- Published categories.
- Published project media.
- Published services.
- Public profile fields.
- Published experience and education entries.
- Published certifications.
- Published testimonials where permission is confirmed.
- Published social links.
- Public site settings only.

### Admin write policies
- Only authenticated, authorized admin users may create, update, publish, unpublish, reorder, or delete CMS content.
- Admin identity must be verified using a secure role strategy, such as a protected admin allowlist or trusted server-managed claim.
- Do not trust a client-side `isAdmin` boolean.
- Do not allow a visitor to grant themselves an admin role.
- Admin checks must be enforced in database policies and, where relevant, server-side endpoints.

### Inquiry policies
- Anonymous users may submit an inquiry through a constrained insert policy or a secure server endpoint.
- Anonymous users may not select, update, or delete inquiry records.
- Admins may read and update inquiries.
- Never expose admin notes to public clients.
- Add anti-spam controls and rate limiting outside the database policy as needed.

### Secrets
- The Supabase anon/publishable key may be used in the browser with correct RLS.
- Never place the Supabase service-role key in frontend code, a public repository, or a `VITE_` environment variable.
- Keep service-role operations in a trusted server environment only.

## 9.4 Storage buckets

Recommended buckets:

| Bucket | Use | Access |
|---|---|---|
| `profile-assets` | Profile image and approved public profile visuals | Public read for published assets; admin write |
| `project-covers` | Project card and case-study covers | Public read; admin write |
| `project-screenshots` | Project gallery images | Public read only for published assets; admin write |
| `project-videos` | Approved demo clips | Public read only for published assets; admin write |
| `certificates` | Certificates or credential visuals | Private by default; publish only if owner chooses |
| `testimonial-media` | Approved testimonial headshots/logos | Public read only when testimonial is published; admin write |

Storage policy requirements:
- Restrict upload types and file sizes.
- Validate image/video formats.
- Use generated unique paths.
- Prevent anonymous upload.
- Delete or replace orphaned media safely.
- Do not publish confidential project screenshots.
- Consider signed URLs for private files.

## 9.5 Seed data

Create a repeatable seed script for:
- Profile information from résumé.
- Four project categories.
- Sixteen project records and live URLs.
- Four experience records and their bullet points.
- Education records.
- Certification/eligibility records.
- Technology catalog.
- Facebook social link.

Do not seed:
- Invented case-study outcomes.
- Fake testimonials.
- Guessed GitHub or LinkedIn links.
- Unverified project-specific technology assignments.
- Fake screenshots or profile images.

---

# 10. Full admin CMS specification

## 10.1 Admin dashboard overview

Show:
- Total projects.
- Published projects.
- Draft projects.
- Featured projects.
- New inquiries.
- Inquiries by status.
- Recent content changes, if audit tracking is implemented.
- Quick actions: Add Project, Review Inquiries, Update Profile.

Dashboard metrics should be derived from actual database data.

## 10.2 Project management

Admin must be able to:
- Create, edit, preview, publish, unpublish, and delete projects.
- Manage name, slug, category, short description, overview, problem, solution, and outcome.
- Set live URL and optional repository URL.
- Toggle featured and case-study visibility.
- Set display order.
- Assign verified technologies.
- Add, reorder, caption, and remove project media.
- Set a cover image.
- Preview the public case-study page before publishing.
- Warn before leaving with unsaved changes.
- Confirm destructive operations.
- Handle duplicate slug errors clearly.

## 10.3 Category management

- Create, edit, reorder, publish, and archive categories.
- Prevent deleting a category that is still assigned to projects unless reassignment is handled.
- Keep category slugs unique.

## 10.4 Media library

- Upload images and videos to the correct bucket.
- Show previews, file size, dimensions, file type, and upload status where available.
- Edit alt text and captions.
- Reorder project media.
- Replace files safely.
- Remove unused files after checking references.
- Prevent accidental removal of media currently used by published content.

## 10.5 Technology management

- Add and edit technology names and categories.
- Manage icon keys from a controlled mapping; do not accept arbitrary executable markup.
- Assign technologies to projects.
- Do not imply a technology was used on a project unless verified.

## 10.6 Profile and content management

Admin can edit:
- Name and headline.
- Short and long biography.
- Location.
- Contact email and phone.
- Availability statement.
- Profile image.
- Services.
- Experience.
- Education.
- Certifications.
- Social links.
- FAQ content if FAQ is CMS-managed.
- Footer and CTA text.
- SEO defaults.

## 10.7 Inquiry management

Statuses:
- `new`
- `reviewing`
- `awaiting_response`
- `qualified`
- `closed`
- `spam`

Admin capabilities:
- Search and filter by status/date/project type.
- Open inquiry details.
- Add private notes.
- Change status.
- Copy contact details.
- Open a `mailto:` link.
- Export inquiries only if a secure export feature is deliberately implemented.
- Delete spam or records according to the owner's retention policy.

Never show private notes in public API responses.

## 10.8 Authentication and account management

- Single owner/admin initially.
- Supabase Auth email/password or magic-link strategy, selected during implementation.
- Require email verification if supported by chosen flow.
- Enable strong password policy and MFA if available and practical.
- No public admin registration.
- Provide sign-out.
- Protect all `/admin/*` routes.
- Re-check authorization on data access; route guards alone are insufficient.
- Define a recovery procedure for the owner.

## 10.9 Admin UX

- Separate admin visual shell from public portfolio.
- Use clear table/list views, search, filters, pagination, and empty states.
- Support keyboard navigation and screen readers.
- Provide save feedback and error recovery.
- Confirm destructive actions.
- Use autosave only if implemented with reliable conflict handling; otherwise explicit Save is safer.
- Display loading skeletons without shifting the entire layout.

---

# 11. Security, privacy, and data handling

## 11.1 Security baseline

- RLS enabled on every exposed table.
- No service-role key in the browser.
- Admin authorization enforced at database level.
- Input validation on client and server boundary.
- Escape/render user-submitted text safely.
- Validate and constrain uploaded files.
- Use HTTPS.
- Keep dependencies updated.
- Avoid logging inquiry message bodies or credentials unnecessarily.
- Do not expose database errors or stack traces to visitors.
- Protect admin routes and sensitive actions.
- Use secure environment variable management in Render.

## 11.2 Privacy notice

Create a concise privacy page explaining:
- What data the inquiry form collects.
- Why the data is collected.
- How the owner may use it to respond.
- Which infrastructure providers process or store it, as applicable.
- How a person may request correction or deletion.
- A contact channel for privacy requests.

The exact legal language and retention policy should be reviewed by the owner before launch. Do not claim legal compliance without review.

## 11.3 Inquiry retention

Retention period is **TBD**. The admin should be able to delete records. A documented retention policy should be chosen before production.

---

# 12. SEO, sharing, and discoverability

## 12.1 Technical SEO

- Unique title and meta description for every public route.
- Canonical URL for each page.
- Open Graph title, description, and image.
- Social preview image for the portfolio.
- Sitemap containing published public routes.
- `robots.txt`.
- Semantic heading structure.
- Descriptive image alt text.
- Human-readable slugs.
- Correct 404 behavior.
- Noindex admin routes and private content.
- Avoid indexing draft or unpublished case studies.

## 12.2 Suggested homepage metadata

**Title proposal:**  
`Anthony Riel C. Diango | Full-Stack Web Developer`

**Description proposal:**  
`Explore the web applications, portals, and digital systems built by Anthony Riel C. Diango — Full-Stack Web Developer and Technical Support professional based in Bohol, Philippines.`

Review before launch.

## 12.3 Structured data

Consider:
- `Person` schema for the portfolio owner.
- `WebSite` schema for the portfolio.
- `CreativeWork` or `SoftwareApplication` only where the project details support it.

Do not include unverified ratings, reviews, prices, or claims.

## 12.4 Analytics

Analytics provider is **TBD**. If analytics is enabled:
- Track page views and key conversion events.
- Track CTA clicks and successful inquiry submission.
- Avoid collecting sensitive form content as analytics event properties.
- Disclose analytics in the privacy notice as appropriate.
- Respect applicable consent requirements.

---

# 13. Render deployment specification

## 13.1 Deployment target

- Render subdomain initially.
- Static Site is the preferred deployment type for a client-side Vite build, assuming no server-side rendering or server endpoints are required.
- If secure server-side email delivery, privileged operations, or SSR are required, add a Render Web Service or select an appropriate server-capable architecture.
- Supabase remains the managed data/auth/storage layer.

## 13.2 Build configuration

Typical Vite static-site settings:
- **Build command:** `npm ci && npm run build`
- **Publish directory:** `dist`

Confirm actual scripts and package manager in the project before configuring Render.

### SPA rewrite

Configure a Render rewrite so client-side routes such as `/projects/:slug` and `/admin/login` resolve to the app entry point. Verify direct URL refresh on nested routes.

## 13.3 Environment variables

Example `.env.example`:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Use the currently recommended Supabase browser-safe key name for the project setup. Never put privileged keys in `VITE_` variables.

If a backend service is added, its private environment may contain server-only secrets such as:
```env
SUPABASE_SERVICE_ROLE_KEY=
EMAIL_PROVIDER_API_KEY=
```

These are examples only and must exist exclusively in a trusted server environment. Do not commit `.env` files.

## 13.4 Deployment checklist

- Git repository created and connected.
- Production Supabase project created.
- SQL migrations applied.
- RLS policies tested.
- Storage buckets and policies configured.
- Seed data inserted.
- Admin account created securely.
- Render environment variables configured.
- Build succeeds.
- SPA rewrites tested.
- All public routes tested by direct URL.
- Contact form tested in production.
- Inquiry notification tested if configured.
- Project deployment URLs checked.
- HTTPS verified.
- Sitemap and robots file verified.
- Mobile layout checked on real devices.

## 13.5 Custom domain later

The initial domain is a Render subdomain. Keep canonical URL and social metadata configurable so a custom domain can be added later without code-wide search-and-replace.

---

# 14. Testing strategy

## 14.1 Functional tests

### Public
- Navigation works on desktop and mobile.
- All homepage anchors resolve correctly.
- Project search and filters work.
- All 16 project cards render from database content.
- Project detail routes load directly and refresh correctly.
- External live links open correctly.
- Contact form validates and submits.
- Success and failure messages are accurate.
- Social links point to verified destinations.
- Draft projects are not visible publicly.

### Admin
- Unauthenticated users cannot access admin pages or data.
- Authorized admin can create, edit, publish, unpublish, reorder, and delete projects.
- Slug uniqueness is enforced.
- Media upload, replacement, reorder, and removal work.
- Category and technology management work.
- Experience, education, services, and profile edits persist.
- Inquiries can be reviewed and status-updated.
- Private notes are not exposed publicly.
- Sign-out invalidates admin access.

## 14.2 Security tests

- Anonymous user cannot read inquiries.
- Anonymous user cannot modify portfolio content.
- Authenticated non-admin user cannot write CMS content.
- User cannot self-assign admin privileges.
- Service-role key is absent from frontend bundles and repository.
- Storage policies prevent unauthorized uploads/deletes.
- Form submissions cannot inject executable markup.
- Oversized or unsupported uploads are rejected.
- Admin routes remain protected after direct URL navigation and page refresh.

## 14.3 Accessibility tests

- Keyboard-only navigation.
- Visible focus indicators.
- Proper labels and error associations.
- Semantic headings and landmarks.
- Color contrast.
- Reduced-motion mode.
- Screen-reader-friendly menus and dialogs.
- Alt text for meaningful images.
- No hover-only functionality.

## 14.4 Performance tests

Targets (goals, not guarantees):
- Lighthouse Performance: 90+
- Lighthouse Accessibility: 95+
- Lighthouse Best Practices: 95+
- Lighthouse SEO: 95+

Test representative mobile and desktop routes. Prioritize the homepage, project gallery, case-study pages, and admin login.

## 14.5 Browser/device coverage

At minimum:
- Current Chrome desktop.
- Current Edge desktop.
- Safari on iOS if available.
- Chrome on Android.
- Common desktop widths.
- Mobile portrait and landscape.

---

# 15. Implementation roadmap

Build in phases. Do not start by implementing every animation or every admin module at once.

## Phase 1 — Project foundation [COMPLETED]

Deliverables:
- [x] Vite + React project initialized with ES Modules.
- [x] Tailwind CSS setup with custom dark editorial tokens.
- [x] Single structured data layer (`src/data/projects.js` & `src/data/profile.js`) verified 1:1 against `CONTENT.md`.
- [x] Global typography (`Space Grotesk`, `Inter`, `JetBrains Mono`) and color tokens.
- [x] Shared layout and accessible navigation with skip link and mobile menu.
- [x] Resilient Supabase client with graceful unconfigured fallback (`src/lib/supabase.js`).
- [x] Environment variable template (`.env.example`) and git repository initialized.

Acceptance:
- [x] App builds cleanly (`npm run build`).
- [x] 100% data fidelity passing (`npm test`).
- [x] Secrets are not committed (excluded in `.gitignore`).

## Phase 2 — Public visual foundation & cinematic motion [COMPLETED]

Deliverables:
- [x] Premium dark editorial visual system (`#101114`, `#17191E`, `#D6AD63`).
- [x] Responsive navigation with sticky glass backdrop and live availability radar.
- [x] Hero section with ambient lighting, positioning, and production metrics strip.
- [x] Interactive HTML5 ambient particle canvas with proximity filaments (`ParticleCanvas.jsx`).
- [x] Dynamic 3D perspective mouse tilt with cursor spotlight beam (`useMouseTilt.js`).
- [x] Smooth animated easing number counters (`Counter.jsx`).
- [x] Magnetic physics-based CTA buttons (`useMagnetic.js`).
- [x] Filterable & searchable 16-project gallery with domain luminous badges (`ProjectGallery.jsx`).
- [x] Cinematic project architectural inspection dialog (`ProjectModal.jsx`).
- [x] Complete Work History timeline, categorized skills grid, degrees, and official credentials.
- [x] Direct contact cards (Email, Phone, Facebook) and validation-backed contact form with mail fallback.
- [x] Full `@media (prefers-reduced-motion: reduce)` accessibility override.

Acceptance:
- [x] Responsive layout works without horizontal overflow across mobile, tablet, and desktop.
- [x] Visible keyboard focus on all interactive elements.
- [x] 44/44 build audit checks pass (`node audit-build.mjs`).

## Phase 3 — Supabase contact backend & database setup [COMPLETED & VERIFIED LIVE]

Deliverables:
- [x] Supabase SQL migration for the `messages` table (`supabase/migrations/20261118000000_create_messages_table.sql`).
- [x] Strict Row-Level Security (RLS) policies allowing public/anon inserts while strictly denying unauthorized reads/updates/deletes.
- [x] Live database connected to `https://ndwwoxsgcegdqiyoipvj.supabase.co` via `.env.local`.
- [x] End-to-end live insert and RLS security verified (`npm run test:live-supabase`).
- [x] Resilient Supabase client with safe unconfigured fallback (`src/lib/supabase.js`).
- [x] Comprehensive setup and migration guide provided in `supabase/README.md`.

Acceptance:
- [x] Live table `public.messages` operational in production Supabase project `ndwwoxsgcegdqiyoipvj`.
- [x] Public anonymous visitors can transmit contact messages without error.
- [x] Row-Level Security actively prevents public reading or scraping of submitted contact data.

## Phase 4 — Production deployment & smoke tests [IN PROGRESS]

Deliverables:
- [x] Configure `render.yaml` Blueprint for Render static site hosting.
- [x] Configure SPA routing rewrite rules (`/*` -> `/index.html`) to prevent 404s.
- [x] Configure caching and security headers (`Cache-Control`, `X-Content-Type-Options`, `X-Frame-Options`).
- [x] Harden `.gitignore` against accidental secret commits (`.env`, `.env.*`, `.supabase/`).
- [ ] Connect repository to Render dashboard for automated CI/CD builds.
- [ ] Verify all 16 live external project URLs in production.
- [ ] Run Chrome DevTools accessibility and Core Web Vitals audit on deployed URL.
- Featured projects.
- About section.
- Services.
- Experience.
- Education and certifications.
- Skills.
- Case-study layout.
- Contact CTA sections.

Acceptance:
- Content is accurate against résumé.
- Incomplete case-study sections are hidden.
- Every project has a stable detail route.

## Phase 5 — Contact conversion

Deliverables:
- Inquiry form.
- Validation.
- Supabase insert policy or secure server endpoint.
- Spam controls.
- Success/error handling.
- Privacy notice.
- Optional email notification integration.

Acceptance:
- Valid inquiries are stored.
- Visitors cannot read submissions.
- Failure state offers a direct contact fallback.

## Phase 6 — Full admin CMS

Deliverables:
- Supabase Auth.
- Admin authorization and RLS.
- Admin layout and dashboard.
- Project/category/technology/media CRUD.
- Profile/services/experience/education/certification management.
- Testimonials management.
- Inquiry management.
- Site settings and social links.

Acceptance:
- Only authorized admin can mutate CMS content.
- CRUD operations persist.
- Destructive operations are confirmed.
- Public site reflects published content.

## Phase 7 — Cinematic polish

Deliverables:
- Hero choreography.
- Project reveal sequences.
- Case-study transitions.
- Scroll-linked storytelling where appropriate.
- Page transitions.
- Reduced-motion fallback.
- Performance review.

Acceptance:
- No scroll hijacking.
- No animation-related content loss.
- No significant mobile performance regression.
- All animations clean up correctly.

## Phase 8 — Production readiness

Deliverables:
- SEO metadata.
- Sitemap and robots.
- Open Graph assets.
- Analytics if selected.
- Accessibility audit.
- Security review.
- Cross-device testing.
- Production deployment and final content review.

Acceptance:
- All critical routes work on production.
- All 16 project records have accurate descriptions and verified links.
- Inquiry pipeline works.
- Admin security tests pass.
- Privacy and content approvals are complete.

---

# 16. Asset and content checklist

## 16.1 Required owner-provided assets

- [ ] Approved professional profile photograph (optional but recommended).
- [ ] Portfolio logo/monogram, or approval to create a typographic mark.
- [ ] Project screenshots for all 16 projects.
- [ ] Project cover images or approval to create consistent typographic covers.
- [ ] Case-study notes for each project.
- [ ] Project-specific technology stack confirmation.
- [ ] Project ownership/role confirmation where wording may be ambiguous.
- [ ] GitHub profile URL.
- [ ] LinkedIn profile URL.
- [ ] Additional social links, if any.
- [ ] Confirmation that the phone number and email may be published.
- [ ] Confirmation that the résumé's availability statement remains current.
- [ ] Any approved testimonials and permission to publish.
- [ ] Any certificates or credential images the owner wishes to display.
- [ ] Analytics preference.
- [ ] Inquiry notification email/provider preference.
- [ ] Inquiry retention policy.
- [ ] Custom domain decision for a later phase.

## 16.2 Project-specific content checklist

For each project:
- [ ] Confirm deployment is online.
- [ ] Confirm public link is safe to share.
- [ ] Capture desktop screenshot.
- [ ] Capture mobile screenshot.
- [ ] Capture key workflow screenshots.
- [ ] Confirm exact technology stack.
- [ ] Confirm owner's role and contribution.
- [ ] Describe the problem or use case.
- [ ] Describe verified features.
- [ ] Explain important implementation decisions.
- [ ] Add measurable outcome only if evidence exists.
- [ ] Review screenshots for personal/confidential data.
- [ ] Approve public case-study text.

## 16.3 Launch content checklist

- [ ] Final headline and supporting copy approved.
- [ ] Profile and contact details approved.
- [ ] Services approved.
- [ ] Experience and education proofread.
- [ ] All project summaries proofread.
- [ ] All 16 URLs verified.
- [ ] Social links verified.
- [ ] Privacy notice reviewed.
- [ ] SEO titles/descriptions reviewed.
- [ ] Open Graph preview reviewed.
- [ ] Favicon and site identity completed.

---

# 17. Explicit assumptions and open decisions

The following details are not fully established by the résumé or confirmed project decisions. Do not silently fill them in.

| Item | Current state | Required action |
|---|---|---|
| Render subdomain name | TBD | Choose available Render service name |
| GitHub profile URL | Not supplied | Owner to provide |
| LinkedIn URL | Not supplied | Owner to provide |
| Additional social links | Not supplied | Owner to provide or omit |
| Profile photograph | Not supplied | Owner to provide or omit |
| Project screenshots | Not supplied in résumé | Capture from approved live deployments |
| Project-specific stack for most projects | Not individually specified | Confirm per project |
| Detailed project roles/contributions | Not fully specified | Owner to provide |
| Project outcomes/metrics | Not supplied | Omit unless substantiated |
| Testimonials | Not supplied | Keep section hidden until genuine and approved |
| Service pricing | Not supplied | Do not publish until confirmed |
| Current availability | Résumé says open to several role types | Confirm before publishing as current |
| Email notification provider | TBD | Select provider and secure server integration |
| Analytics provider | TBD | Select or omit |
| Inquiry retention policy | TBD | Decide and document |
| Admin login method | TBD | Choose email/password or magic link |
| Admin MFA | To evaluate | Enable if available and practical |
| SSR/prerendering | Not yet selected | Evaluate SEO needs before final architecture lock |
| Custom domain | Later | Keep deployment/domain configuration portable |

---

# 18. Definition of done

The portfolio is ready for public launch when all of the following are true:

1. The site communicates the owner's verified professional identity and value clearly.
2. The homepage is responsive, polished, and provides a clear path to the projects and contact form.
3. All 16 résumé projects are represented accurately in the portfolio database and gallery.
4. Every published project has a verified live URL or the live-link action is omitted.
5. Project case-study pages show only supported information.
6. The experience, education, certification, and skills sections match the résumé.
7. The contact form stores inquiries securely and communicates success/failure accurately.
8. The admin CMS can manage all required portfolio content.
9. RLS prevents public access to private inquiries and unauthorized content changes.
10. No privileged secrets are present in frontend code or the public repository.
11. Motion is cinematic but does not impair navigation, accessibility, or performance.
12. Reduced-motion users receive a usable experience.
13. Public routes work when opened directly or refreshed on Render.
14. SEO metadata and social previews are configured.
15. Privacy and content approvals are complete.
16. Production tests pass on desktop and mobile.

---

# 19. Recommended first development milestone

Start with a working, deployable foundation rather than a large animation prototype.

**Milestone 1 should deliver:**
1. React + Vite + Tailwind initialized in VS Code.
2. Git repository initialized.
3. Render static-site deployment working.
4. Supabase project connected using browser-safe credentials.
5. Dark design tokens and typography established.
6. Public navigation and responsive page shell implemented.
7. Homepage hero and first project gallery layout implemented using local seed/mock data.
8. The 16-project data model prepared for Supabase seeding.

Only after the foundation is stable should the project move to the complete Supabase CMS and cinematic scroll sequences.

---

## Appendix A — Verified résumé facts to preserve

- Name: Anthony Riel C. Diango.
- Headline: Full-Stack Web Developer | Technical Support.
- Location: Guinacot, Guindulman, Bohol, Philippines.
- Phone: +63 960 676 8549.
- Email: rieldiango24@gmail.com.
- Facebook: facebook.com/realnariel.
- Résumé states: 16+ live deployed web applications.
- Résumé states: 10+ years in IT systems and database operations.
- Education: BS Computer Engineering, Bohol Island State University – Main Campus, Tagbilaran City; graduated March 2013.
- Education: Bachelor of Secondary Education (Qualifying), University of Bohol, Tagbilaran City; 2021–2022.
- Certifications/eligibility: TESDA NC II – Computer Systems Servicing; Python Essentials 1 (Cisco Networking Academy); Licensure Examination for Teachers; CSC Career Service Professional Eligibility.
- Employment: DepEd, August 2024–Present; DPWH, November 2023–June 2024; Department of Agriculture Regional Field Office VIII, May 2015–March 2021; Business Machines Corporation, October 2013–May 2015.

## Appendix B — Implementation guardrails

- Build the website as a maintainable product, not a single monolithic component.
- Keep content in Supabase once CMS functionality is implemented.
- Keep public content and private admin data separated by RLS.
- Never use a service-role key in client-side code.
- Never fabricate project proof.
- Do not use screenshots that expose real patient, student, employee, or other personal information.
- Do not make motion essential to understanding or accessing content.
- Do not let a visual effect take priority over project clarity and contact conversion.
- Keep the Render deployment portable so a custom domain can be added later.
- Record architecture decisions and changes in the repository README or `/docs` directory.

---

**End of specification.**
