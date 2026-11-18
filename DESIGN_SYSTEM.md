# Design System

## Creative direction

Build a confident, editorial project gallery with a strong visual point of view. The work should feel like a curated collection of shipped digital products, not a generic resume template or dashboard. Let project presentation dominate the page; use the developer's Bohol location and practical engineering background as personal context.

## Visual principles

- Use a restrained, high-contrast palette with a warm paper-like base, deep ink text, and one vivid accent. Reserve the accent for calls to action, active filters, and selected details.
- Pair a distinctive display face for large headlines with a highly readable sans-serif for body text and interface labels. Load fonts efficiently and provide system fallbacks.
- Use generous whitespace, clear type hierarchy, crisp dividers, and varied but consistent project-card compositions.
- Prefer real project screenshots or supplied assets when available. Until then, create intentional typographic/project-category treatments; do not use unrelated stock imagery or fake product screenshots.
- Use a consistent spacing scale, rounded corners sparingly, and restrained shadows. Avoid visual clutter and decorative effects that compete with project titles.

## Motion and interaction

- Make the first viewport feel alive with a deliberate entrance sequence and subtle ambient movement.
- Use short, consistent transitions for hover, filter, navigation, and section reveals. Keep project content readable during movement.
- Use IntersectionObserver or CSS for scroll reveals; animate only transform and opacity where practical.
- Give project cards responsive hover/focus affordances and a clear live-site action. Touch users must receive equivalent functionality.
- Avoid scroll hijacking, excessive parallax, perpetual motion, and animation that delays access to content.
- Under `prefers-reduced-motion: reduce`, remove nonessential movement and reveal delays.

## Layout and accessibility

- Mobile-first, fluid layout; project cards adapt cleanly from one column to a multi-column gallery.
- Keep navigation and contact actions visible and easy to reach on small screens.
- Use semantic landmarks, a logical heading order, visible keyboard focus, descriptive link text, and sufficient contrast.
- Do not rely on color, hover, or motion alone to communicate state.
