# Design System: ARD Dev Studio

## Creative Direction

**Direction:** Premium Dark Editorial / Cinematic Technology Portfolio & Business Platform.

The design establishes a high-contrast, polished, and deliberate visual point of view for **ARD Dev Studio**: a curated collection of shipped digital products built by Anthony Riel C. Diango, an experienced Computer Engineer from Bohol, Philippines. It rejects generic resume templates and vibecoded cliches in favor of deep surfaces, crisp hairlines, warm-gold highlights, and purposeful 60fps motion.

## Brand Identity & Visual Assets

The visual identity is anchored by official metallic and architectural gold insignia located in `public/images/`:

| Asset | File | Application | Visual Role |
|---|---|---|---|
| **ARD Metallic Monogram** | `public/images/logo.jpg` | Header brand mark, Footer signature, Browser Favicon (`/images/logo.jpg`) | 3D beveled gold monogram emblem symbolizing precision engineering and craftsmanship for ARD Dev Studio. |
| **Architectural Blueprint Seal** | `public/images/logodesign.jpg` | Hero interactive showcase card, OpenGraph image, Twitter preview | High-definition technical blueprint medallion featuring gold circuitry, gear motifs, and architectural symmetry. |

### Visual Implementation Details
- **Header**: Circular 38px badge with gold ring border (`border-gold/30`), hover scale transition, and dual-tier typography ("ARD Dev Studio" with "Anthony Riel Diango").
- **Hero Showcase**: 12-column responsive layout featuring an interactive 3D perspective card (`useMouseTilt`) containing the blueprint seal, active "ARD DEV STUDIO // SEAL" header, and "Lead Engineer: Anthony Riel Diango" telemetry.
- **Footer**: Circular 36px badge paired with studio title, engineer credentials, and location metadata.

## Color Tokens & Palette

| Token | Value | Role |
|---|---|---|
| `background` | `#101114` | Deep charcoal page background |
| `surface` | `#17191E` | Card & panel background |
| `surface-elevated` | `#1E2127` | Dialogs, elevated tags, and modal backdrop |
| `border-subtle` | `#292C32` | Hairline card borders & section dividers |
| `accent-gold` | `#D6AD63` | Primary warm-gold brand accent, active filters, CTAs |
| `accent-gold-hover`| `#E5BE75` | Hover state for interactive gold elements |
| `accent-gold-glow` | `rgba(214, 173, 99, 0.18)` | Ambient radial glow & cursor spotlight |
| `text-primary` | `#F2F0EB` | High-contrast main headings & titles |
| `text-secondary` | `#A1A1AA` | Highly readable body copy & descriptions |
| `text-muted` | `#71717A` | Metadata labels & subtle timestamps |

### Domain-Specific Luminous Accents
- **Healthcare & Business Operations**: Emerald Teal (`#34d399`, `rgba(52, 211, 153, 0.15)` glow)
- **Civic, Government & Tourism**: Cyan / Sky Blue (`#38bdf8`, `rgba(56, 189, 248, 0.15)` glow)
- **Events, Registration & Scoring**: Electric Violet (`#c084fc`, `rgba(192, 132, 252, 0.15)` glow)
- **Education & Institutional Systems**: Warm Amber (`#fbbf24`, `rgba(251, 191, 36, 0.15)` glow)

## Typography System

- **Display & Headings**: `Space Grotesk` (weights 500, 600, 700) — distinctive geometric editorial headers.
- **Body & Controls**: `Inter` (weights 300, 400, 500, 600) — clean, highly legible interface typography.
- **Technical & Metadata**: `JetBrains Mono` (weights 400, 500, 600) — uppercase tags, metric counters, and URLs.
- **Fallbacks**: System-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', monospace.

## Implemented Motion & Cinematic Architecture

The portfolio implements 5 dedicated motion modules that guide user attention without compromising accessibility or performance:

1. **Interactive HTML5 Particle Canvas (`ParticleCanvas.jsx`)**:
   - Amber/gold nodes drift gently across the hero background and form faint filament connections when close.
   - Gently responds to cursor proximity and automatically pauses when off-screen or when reduced-motion is requested.

2. **3D Perspective Mouse Tilt & Cursor Spotlight (`useMouseTilt.js`)**:
   - Cards calculate cursor distance from center and subtly tilt in 3D perspective (`perspective(1000px) rotateX(...) rotateY(...) translateZ(6px)`).
   - Dynamic radial spotlight beam follows cursor position across the card surface.

3. **Smooth Animated Number Counters (`Counter.jsx`)**:
   - Production metrics (`16+` apps, `10+` years ops, `4` domains) smoothly count up using ease-out cubic interpolation upon entering the viewport via `IntersectionObserver`.

4. **Magnetic Elastic CTA Buttons (`useMagnetic.js`)**:
   - Primary action buttons softly gravitate toward the user's cursor on hover and spring back smoothly on leave.

5. **Cinematic Project Inspection Drawer / Modal (`ProjectModal.jsx`)**:
   - Clicking any project card opens a dark glass inspection dialog displaying full architecture scope, verified technology tags, host telemetry, and direct launch actions. Supports ESC key dismissal and body scroll locking.

6. **Scroll Reveal Choreography (`useScrollReveal.jsx`)**:
   - Sections and cards fade and translate smoothly into view using hardware-accelerated `transform` and `opacity`.

7. **Mobile Floating Dock & Portrait Art Landing Architecture (`MobileFloatingNav.jsx`)**:
   - On mobile and tablet portrait devices, the 3D brand art card commands the entire landing viewport (`min-h-[calc(100svh-4.5rem)]`), framed between the clean top header and the floating glass dock.
   - The traditional hamburger dropdown is replaced by an ergonomic floating bottom navigation dock (`MobileFloatingNav.jsx`) matching the design language across Anthony's shipped systems (e.g. DentalClinic, The Boarders), featuring active intersection tracking, touch-optimized tap targets, safe-area inset compensation, and a direct Studio Portal trigger.

## Accessibility & Reduced-Motion Guarantees

- **`prefers-reduced-motion: reduce`**: A dedicated global media query overrides all animations and transitions (`0.01ms`), disables canvas particle animation, disables 3D tilt, and immediately displays final counter numbers.
- **Visible Keyboard Focus**: Universal 2px gold outline (`:focus-visible`) on all interactive buttons, cards, and links.
- **Contrast**: Text contrast meets WCAG AA (minimum 4.5:1 for body, 3:1 for large headings against `#101114`).
- **Semantic HTML**: Proper landmarks (`<header role="banner">`, `<main id="main-content">`, `<footer role="contentinfo">`, `<nav aria-label="...">`).
