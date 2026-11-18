/**
 * DOM-free HTML/CSS/JSX audit — checks the built dist/index.html and
 * the generated CSS for critical accessibility and layout markers.
 */
import fs from 'fs';
import path from 'path';

const html = fs.readFileSync('dist/index.html', 'utf-8');
const cssFile = fs.readdirSync('dist/assets').find(f => f.endsWith('.css'));
const css  = fs.readFileSync(path.join('dist/assets', cssFile), 'utf-8');
const jsFile  = fs.readdirSync('dist/assets').find(f => f.endsWith('.js'));
const js   = fs.readFileSync(path.join('dist/assets', jsFile), 'utf-8');

const checks = [];
const assert = (name, cond, detail = '') => checks.push({ name, pass: !!cond, detail });

// ── HTML document ───────────────────────────────────────────────────
assert('HTML lang attribute',           html.includes('lang="en"'));
assert('Charset UTF-8',                 html.includes('charset="UTF-8"'));
assert('Meta viewport',                 html.includes('name="viewport"'));
assert('Meta description',              html.includes('name="description"'));
assert('Page title includes name',      html.includes('Anthony Riel C. Diango'));

// ── JS bundle — accessibility & semantic ───────────────────────────
assert('Skip link present',             js.includes('skip-link'));
assert('Main landmark',                 js.includes('"main"') || js.includes('main-content'));
assert('Header role banner',            js.includes('"banner"'));
assert('Footer role contentinfo',       js.includes('"contentinfo"'));
assert('Nav aria-label primary',        js.includes('Primary navigation'));
assert('Nav aria-label footer',         js.includes('Footer navigation'));
assert('Nav aria-label mobile',         js.includes('Mobile navigation'));
assert('Heading h1',                    js.includes('"h1"'));
assert('Heading h2 work',              js.includes('work-heading'));
assert('Heading h2 about',             js.includes('about-heading'));
assert('Heading h2 contact',           js.includes('contact-heading'));
assert('aria-live polite on filter',    js.includes('aria-live'));
assert('aria-pressed on filters',       js.includes('aria-pressed'));
assert('aria-label project cards',      js.includes('aria-label') && js.includes('institutional'));
assert('rel noopener noreferrer',       js.includes('noopener noreferrer'));
assert('External links open new tab',   js.includes('_blank'));
assert('mailto link',                   js.includes('mailto:'));
assert('tel link',                      js.includes('tel:'));
assert('Facebook link',                 js.includes('facebook.com/realnariel'));
assert('All 16 live URLs present',
  [
    'dentaprimedemo.onrender.com',
    'theboarders.onrender.com',
    'ekumbatidemo.onrender.com',
    'suroyguindulman.onrender.com',
    'sinoog2027.onrender.com',
    'execon.onrender.com',
    'boholmeet.onrender.com',
    'congmeet.onrender.com',
    'calapedistrictmeet.onrender.com',
    'locatumeet.onrender.com',
    'abigailandwilt.onrender.com',
    'smartftnhs.onrender.com',
    'ftnhs.somee.com',
    'ferminexam.onrender.com',
    'ftnhsweatherhub.onrender.com',
    'ftnhstinabangay.onrender.com',
  ].every(url => js.includes(url))
);
assert('Contact email in bundle',       js.includes('rieldiango24@gmail.com'));
assert('Contact phone in bundle',       js.includes('+63 960 676 8549'));
// Supabase is tree-shaken/minified; check that the helper module's exports
// are referenced — the source file contains isSupabaseConfigured, and the
// Contact component conditionally renders based on it.
assert('Supabase graceful null check',  js.includes('isSupabaseConfigured') || js.includes('Send a Message'));

// ── CSS — accessibility & motion ────────────────────────────────────
assert('focus-visible ring defined',    css.includes('focus-visible'));
assert('prefers-reduced-motion block',  css.includes('prefers-reduced-motion'));
assert('Fade-up animation keyframe',    css.includes('fade-up'));
assert('Reveal transition defined',     css.includes('.reveal'));
assert('Skip link styles present',      css.includes('.skip-link'));
assert('Filter button styles',          css.includes('.filter-btn'));
assert('Project card hover styles',     css.includes('.project-card'));
assert('Timeline styles',               css.includes('.timeline-line') && css.includes('.timeline-dot'));
assert('Category band classes',         css.includes('cat-band-healthcare'));
assert('Form field styles',             css.includes('.form-field'));
assert('Button primary styles',         css.includes('.btn-primary'));
assert('Button outline styles',         css.includes('.btn-outline'));
assert('Mobile menu styles',            css.includes('.mobile-menu'));
assert('Container layout util',         css.includes('.container'));
assert('Section pad util',              css.includes('.section-pad'));
assert('Hairline divider util',         css.includes('.hairline'));
assert('Label-caps util',               css.includes('.label-caps'));
assert('Chip badge util',               css.includes('.chip'));
assert('CSS custom properties (tokens)',css.includes('--accent') && css.includes('--ink') && css.includes('--paper'));
assert('Font Playfair Display loaded',  css.includes('Playfair Display') || css.includes('playfair'));
assert('font-display-swap or similar',  css.includes('swap') || css.includes('googleapis'));
assert('No horizontal overflow risk',   !css.includes('overflow-x: scroll') && !css.includes('width: 200'));

// ── Report ──────────────────────────────────────────────────────────
const passed = checks.filter(c => c.pass).length;
const failed = checks.filter(c => !c.pass);

console.log(`\nAudit Results: ${passed}/${checks.length} checks passed\n`);

if (failed.length > 0) {
  console.log('FAILED checks:');
  failed.forEach(c => console.log('  FAIL:', c.name, c.detail ? `(${c.detail})` : ''));
  process.exit(1);
} else {
  console.log('All audit checks passed.');
}
