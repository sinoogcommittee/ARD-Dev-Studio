/**
 * Build Audit — checks the built dist/index.html, JS, and CSS
 * for critical accessibility, semantic landmarks, dark theme tokens, and project URLs.
 */
import fs from 'fs';
import path from 'path';

const html = fs.readFileSync('dist/index.html', 'utf-8');
const cssFile = fs.readdirSync('dist/assets').find(f => f.endsWith('.css'));
const css  = fs.readFileSync(path.join('dist/assets', cssFile), 'utf-8');
const jsFiles = fs.readdirSync('dist/assets').filter(f => f.endsWith('.js'));
const js = jsFiles.map(f => fs.readFileSync(path.join('dist/assets', f), 'utf-8')).join('\n');

const checks = [];
const assert = (name, cond, detail = '') => checks.push({ name, pass: !!cond, detail });

// ── HTML document ───────────────────────────────────────────────────
assert('HTML lang attribute',           html.includes('lang="en"'));
assert('Charset UTF-8',                 html.includes('charset="UTF-8"'));
assert('Meta viewport',                 html.includes('name="viewport"'));
assert('Meta description',              html.includes('name="description"'));
assert('Page title includes name',      html.includes('Anthony Riel C. Diango'));
assert('Dark class or scheme in html',  html.includes('dark') || html.includes('color-scheme'));
assert('PWA manifest linked',           html.includes('rel="manifest"') && html.includes('/manifest.json'));
assert('Apple touch icon linked',       html.includes('rel="apple-touch-icon"'));
assert('Application name meta',         html.includes('name="application-name"') && html.includes('ARD Dev Studio'));
assert('Mobile web app capable meta',   html.includes('name="mobile-web-app-capable"'));
assert('OG image points to ARDDevStudioLogo preview', html.includes('ARDDevStudioLogo-preview.png'));
assert('OG image uses absolute URL',    html.includes('content="https://arddevstudio.onrender.com/images/ARDDevStudioLogo-preview.png"'));
assert('Twitter image uses absolute URL', html.includes('name="twitter:image"') && html.includes('ARDDevStudioLogo-preview.png'));

// ── PWA & App Manifest ──────────────────────────────────────────────
const manifestExists = fs.existsSync('dist/manifest.json');
assert('PWA manifest exists in dist',   manifestExists);
if (manifestExists) {
  const manifest = JSON.parse(fs.readFileSync('dist/manifest.json', 'utf-8'));
  assert('Manifest app name ARD Dev Studio', manifest.name === 'ARD Dev Studio');
  assert('Manifest short_name ARD Dev Studio', manifest.short_name === 'ARD Dev Studio');
  assert('Manifest display standalone', manifest.display === 'standalone');
  assert('Manifest includes Circle Logo', manifest.icons.some(i => i.src.includes('ARDDevStudioCircleLogo.png')));
}
assert('Service worker exists in dist', fs.existsSync('dist/sw.js'));
assert('PWA icons exist in dist',       fs.existsSync('dist/images/icon-192.png') && fs.existsSync('dist/images/icon-512.png'));
assert('Original ARDDevStudioLogo.png preserved', fs.existsSync('dist/images/ARDDevStudioLogo.png'));
assert('Social preview image exists in dist', fs.existsSync('dist/images/ARDDevStudioLogo-preview.png'));

assert('All 20 project preview images exist in dist',
  [
    'Abigail and Wilt Wedding Hub.png',
    'boholmeet.png',
    'Calape District Meet.png',
    'carlsfried.png',
    'Congressional Meet.png',
    'Dentaprime.png',
    'e-FTNHS.png',
    'e-KUMBATI.png',
    'Execon.png',
    'Fermin Exam Assessment.png',
    'FTNHS Tinabangay.png',
    'FTNHS Weather Hub.png',
    'FTNHS Web Portal.png',
    'Guindulman Website.png',
    'Locatu Meet.png',
    'Panganga ES Library Hub.png',
    'sinoog2027.png',
    'Smart FTNHS.png',
    'suroyguindulman.png',
    'The Boarders.png',
  ].every(file => fs.existsSync(path.join('dist/images/highlight_projects_preview', file)))
);

// ── JS bundle — accessibility & semantic landmarks ───────────────────
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
assert('rel noopener noreferrer',       js.includes('noopener noreferrer'));
assert('External links open new tab',   js.includes('_blank'));
assert('mailto link',                   js.includes('mailto:'));
assert('tel link',                      js.includes('tel:'));
assert('Facebook link',                 js.includes('facebook.com/realnariel'));
assert('All live URLs present',
  [
    'dentaprimedemo.onrender.com',
    'theboarders.onrender.com',
    'carlsfried.onrender.com',
    'ekumbatidemo.onrender.com',
    'suroyguindulman.onrender.com',
    'guindulmandemo.onrender.com',
    'sinoog2027.onrender.com',
    'execon.onrender.com',
    'boholmeet.onrender.com',
    'congmeet.onrender.com',
    'calapemeet.onrender.com',
    'locatumeet.onrender.com',
    'abigailandwilt.onrender.com',
    'smartftnhs.onrender.com',
    'ftnhs.somee.com',
    'ferminexam.onrender.com',
    'ftnhsweatherhub.onrender.com',
    'ftnhstinabangay.onrender.com',
    'pesbooks.onrender.com',
    'eftnhs.onrender.com',
  ].every(url => js.includes(url))
);
assert('Contact email in bundle',       js.includes('rieldiango24@gmail.com'));
assert('Contact phone in bundle',       js.includes('+63 960 676 8549'));
assert('Supabase graceful null check',  js.includes('isSupabaseConfigured') || js.includes('Send a Direct Message'));

// ── CSS — Dark Editorial tokens, accessibility & motion ─────────────
assert('focus-visible ring defined',    css.includes('focus-visible'));
assert('prefers-reduced-motion block',  css.includes('prefers-reduced-motion'));
assert('Fade-up animation keyframe',    css.includes('fade-up'));
assert('Reveal transition defined',     css.includes('.reveal'));
assert('Skip link styles present',      css.includes('.skip-link'));
assert('Category badge classes',        css.includes('cat-badge-healthcare'));
assert('Button gold primary styles',    css.includes('.btn-gold-primary'));
assert('Button dark outline styles',    css.includes('.btn-dark-outline'));
assert('Card dark styles',              css.includes('.card-dark'));
assert('Tech chip styles',              css.includes('.tech-chip'));
assert('Filter pill styles',            css.includes('.filter-pill'));
assert('Container layout util',         css.includes('.container-custom'));
assert('Section spacing util',          css.includes('.section-spacing'));
assert('Mono caps util',                css.includes('.mono-caps'));
assert('Dark tokens present',           css.includes('--bg-dark') && css.includes('--accent-gold'));
assert('Fonts loaded',                  css.includes('Space Grotesk') || css.includes('Inter') || css.includes('JetBrains Mono'));

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
