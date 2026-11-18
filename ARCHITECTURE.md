# Website Architecture

## Stack

- React for page composition and interactive project browsing.
- Tailwind CSS for responsive styling and design tokens.
- Supabase for an optional contact-message backend (Postgres; enable Row-Level Security).
- VS Code as the development environment.

## Page structure

1. Header/navigation with anchors to Work, About, and Contact.
2. Hero: name, role, concise value statement, availability, and prominent View Projects / Contact actions.
3. Project gallery: all entries from `CONTENT.md`, organized by category with simple filters; feature several representative projects first.
4. Experience and skills: concise highlights and stack groups.
5. Education and credentials: compact supporting section.
6. Contact: email, phone, Facebook, and optional form; repeat availability.
7. Footer with name, location, and navigation/contact links.

Keep project data in a single structured source (for example, `src/data/projects.js` or JSON) with stable IDs, category, title, summary, URL, and optional stack tags. Render cards and filters from this source instead of duplicating project content in components. Keep resume-derived copy centralized and easy to update.

## Contact form and Supabase

- Treat direct email, phone, and Facebook links as the reliable contact options.
- Add a Supabase form only if project configuration is available. Collect only name, email, and message; validate inputs and provide clear success/error states.
- Put the Supabase URL and publishable/anon key in environment variables. Never expose a service-role key in browser code or commit secrets.
- Create a messages table with only the fields needed and timestamp. Enable RLS; allow narrowly scoped anonymous inserts only, and deny public reads/updates/deletes. Add spam protection or rate limiting before production use.
- If Supabase is not configured or a submission fails, retain visible direct-contact links and explain the fallback clearly.

## Motion and performance

- Prefer CSS transitions/keyframes and IntersectionObserver for modest entrance and scroll effects; add a motion library only if interaction complexity warrants it.
- Honor reduced-motion preferences, avoid blocking the page behind animation, and keep filter/navigation actions immediate.
- Lazy-load project imagery, use optimized responsive assets, and avoid loading remote media unnecessarily.

## Configuration and deployment

- Store local secrets in an ignored `.env.local`; provide `.env.example` containing variable names only.
- Confirm deployment target and production Supabase settings before publishing. The resume lists Render, Vercel, and Somee as hosting experience; it does not specify the intended host for this portfolio.
- Before launch, verify all 16 external project URLs, the contact links, form behavior (if enabled), mobile layout, keyboard navigation, and reduced-motion behavior.
