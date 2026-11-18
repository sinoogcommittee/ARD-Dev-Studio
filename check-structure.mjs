import fs from 'fs';

const checks = [
  ['src/App.jsx', ['Header', 'Hero', 'ProjectGallery', 'AboutSection', 'ContactSection', 'Footer', 'main-content']],
  ['src/components/Header.jsx', ['skip-link', 'aria-label', 'mobile-menu', 'hamburger']],
  ['src/components/Hero.jsx', ['btn-primary', 'btn-outline', 'anim-fade-up', 'availability', 'View Projects', 'Contact Me']],
  ['src/components/ProjectGallery.jsx', ['filter-btn', 'aria-pressed', 'aria-live', 'RevealDiv', 'featured']],
  ['src/components/ProjectCard.jsx', ['bandClass', 'View Live Site', 'noopener noreferrer', 'aria-label']],
  ['src/components/AboutSection.jsx', ['timeline-line', 'timeline-dot', 'experience', 'educationAndCredentials', 'credentials']],
  ['src/components/ContactSection.jsx', ['mailto:', 'tel:', 'facebook', 'isSupabaseConfigured', 'aria-invalid', 'role="alert"']],
  ['src/components/Footer.jsx', ['contentinfo', 'Footer navigation', 'availability']],
  ['src/index.css', ['prefers-reduced-motion', 'reveal', 'focus-visible', 'skip-link', 'timeline-line', 'timeline-dot']],
  ['src/hooks/useScrollReveal.jsx', ['IntersectionObserver', 'prefers-reduced-motion', 'reveal visible']],
];

let pass = 0;
let fail = 0;

for (const [file, tokens] of checks) {
  const content = fs.readFileSync(file, 'utf-8');
  for (const tok of tokens) {
    if (content.includes(tok)) {
      pass++;
    } else {
      console.error('MISSING in ' + file + ': ' + tok);
      fail++;
    }
  }
}

console.log('Checks: ' + pass + ' passed, ' + fail + ' failed');
if (fail > 0) process.exit(1);
else console.log('All structural checks passed.');
