import fs from 'fs';
import { projects, PROJECT_CATEGORIES } from './src/data/projects.js';
import { profile } from './src/data/profile.js';
import { supabase, isSupabaseConfigured } from './src/lib/supabase.js';

console.log('--- RUNNING PHASE 1 VERIFICATION CHECKS ---');

// 1. Check Projects Count
if (projects.length !== 20) {
  console.error(`FAIL: Expected 20 projects, found ${projects.length}`);
  process.exit(1);
}
console.log('PASS: Exact 20 projects present.');

// 2. Exact Expected Deployments and Categories from CONTENT.md
const expectedProjects = [
  {
    category: 'Healthcare & business operations',
    title: 'DentaPrime Clinic Portal',
    liveUrl: 'https://dentaprimedemo.onrender.com',
    description: 'Dental clinic management with patient scheduling, treatment tracking, and service catalog.'
  },
  {
    category: 'Healthcare & business operations',
    title: 'The Boarders App',
    liveUrl: 'https://theboarders.onrender.com',
    description: 'Collaborative shared-household management and automated expense splitting.'
  },
  {
    category: 'Healthcare & business operations',
    title: 'Carl’s Fried',
    liveUrl: 'https://carlsfried.onrender.com',
    description: 'Online storefront and ordering web application for a fried food business, featuring a digital menu and customer ordering.'
  },
  {
    category: 'Civic, government & tourism',
    title: 'e-KUMBATI District Portal',
    liveUrl: 'https://ekumbatidemo.onrender.com',
    description: 'Constituent services with program tracking, action-center request workflows, and directory tools.'
  },
  {
    category: 'Civic, government & tourism',
    title: 'Suroy Guindulman',
    liveUrl: 'https://suroyguindulman.onrender.com',
    description: 'Municipal tourism portal showcasing destinations, itineraries, and local guides.'
  },
  {
    category: 'Civic, government & tourism',
    title: 'Guindulman Website',
    liveUrl: 'https://guindulmandemo.onrender.com',
    description: 'Official municipal government web portal featuring citizen services, transparency reports, barangay directory, and emergency hotlines.'
  },
  {
    category: 'Events, registration & scoring',
    title: 'Sinoog 2027 Event Hub',
    liveUrl: 'https://sinoog2027.onrender.com',
    description: 'Event registration, participant management, and operational dashboard; React and Supabase.'
  },
  {
    category: 'Events, registration & scoring',
    title: 'ExeCon 2026 Platform',
    liveUrl: 'https://execon.onrender.com',
    description: 'Conference and executive-event logistics, scheduling, and attendee management.'
  },
  {
    category: 'Events, registration & scoring',
    title: 'Bohol Meet Scoring System',
    liveUrl: 'https://boholmeet.onrender.com',
    description: 'Real-time provincial athletic scoring, medal tallying, and results portal.'
  },
  {
    category: 'Events, registration & scoring',
    title: 'Congressional Meet Portal',
    liveUrl: 'https://congmeet.onrender.com',
    description: 'Multi-municipality sports competition management and live tabulation.'
  },
  {
    category: 'Events, registration & scoring',
    title: 'Calape District Meet',
    liveUrl: 'https://calapemeet.onrender.com',
    description: 'District athletic scoring engine for event encoding and standings.'
  },
  {
    category: 'Events, registration & scoring',
    title: 'Locatu Meet System',
    liveUrl: 'https://locatumeet.onrender.com',
    description: 'Sports meet results and event coordination web application.'
  },
  {
    category: 'Events, registration & scoring',
    title: 'Abigail & Wilt Wedding Hub',
    liveUrl: 'https://abigailandwilt.onrender.com',
    description: 'Event logistics, digital invitation, and personalized RSVP platform.'
  },
  {
    category: 'Education & institutional systems',
    title: 'Smart FTNHS Management',
    liveUrl: 'https://smartftnhs.onrender.com',
    description: 'School operations hub built with React, Tailwind CSS, and Supabase.'
  },
  {
    category: 'Education & institutional systems',
    title: 'FTNHS Web Portal (.NET)',
    liveUrl: 'https://ftnhs.somee.com',
    description: 'Institutional school web application built with .NET Technology.'
  },
  {
    category: 'Education & institutional systems',
    title: 'FerminExam Assessment',
    liveUrl: 'https://ferminexam.onrender.com',
    description: 'Digital examination, automated grading, and student assessment application.'
  },
  {
    category: 'Education & institutional systems',
    title: 'FTNHS Weather Hub',
    liveUrl: 'https://ftnhsweatherhub.onrender.com',
    description: 'Decision-support dashboard determining learning modalities from weather thresholds.'
  },
  {
    category: 'Education & institutional systems',
    title: 'FTNHS Tinabangay Portal',
    liveUrl: 'https://ftnhstinabangay.onrender.com',
    description: 'School-community support, outreach, and resource coordination platform.'
  },
  {
    category: 'Education & institutional systems',
    title: 'Pangangan ES Library Hub',
    liveUrl: 'https://pesbooks.onrender.com',
    description: 'Elementary school digital library showcasing storybooks, Philippine folklore, and DepEd learning materials for young readers.'
  },
  {
    category: 'Education & institutional systems',
    title: 'e-FTNHS Faculty Portal',
    liveUrl: 'https://eftnhs.onrender.com',
    description: 'Integrated school management portal for faculty scheduling, lesson plan auditing, and performance tracking.'
  }
];

expectedProjects.forEach((expected, i) => {
  const match = projects.find(p => p.liveUrl === expected.liveUrl);
  if (!match) {
    console.error(`FAIL: Missing project for URL ${expected.liveUrl}`);
    process.exit(1);
  }
  if (match.title !== expected.title) {
    console.error(`FAIL: Title mismatch for ${expected.liveUrl}. Expected "${expected.title}", got "${match.title}"`);
    process.exit(1);
  }
  if (match.category !== expected.category) {
    console.error(`FAIL: Category mismatch for ${expected.liveUrl}. Expected "${expected.category}", got "${match.category}"`);
    process.exit(1);
  }
  if (match.description !== expected.description) {
    console.error(`FAIL: Description mismatch for ${expected.liveUrl}. Expected "${expected.description}", got "${match.description}"`);
    process.exit(1);
  }
  if (!match.liveUrl.startsWith('https://')) {
    console.error(`FAIL: Non-HTTPS URL detected for ${match.title}: ${match.liveUrl}`);
    process.exit(1);
  }
  if (!match.id || typeof match.id !== 'string') {
    console.error(`FAIL: Invalid stable ID for ${match.title}`);
    process.exit(1);
  }
  if (!Array.isArray(match.stack) || match.stack.length === 0) {
    console.error(`FAIL: Missing stack tags for ${match.title}`);
    process.exit(1);
  }
  if (!match.previewImage || !fs.existsSync('public' + match.previewImage)) {
    console.error(`FAIL: Missing previewImage on disk for ${match.title}: ${match.previewImage}`);
    process.exit(1);
  }
});
console.log('PASS: All 20 projects match CONTENT.md 1:1 on Title, Category, URL, and Description.');

// 3. Featured Flag Check Across Categories
const featuredCategories = new Set(projects.filter(p => p.featured).map(p => p.category));
const requiredCategories = [
  'Healthcare & business operations',
  'Civic, government & tourism',
  'Events, registration & scoring',
  'Education & institutional systems'
];

requiredCategories.forEach(cat => {
  if (!featuredCategories.has(cat)) {
    console.error(`FAIL: Featured projects do not span category: ${cat}`);
    process.exit(1);
  }
});
console.log('PASS: Featured projects span all 4 primary domains (business, civic/tourism, events, and education).');

// 4. Profile and Contact Verification
if (profile.identity.name !== 'Anthony Riel C. Diango') {
  console.error('FAIL: Profile name mismatch');
  process.exit(1);
}
if (profile.contact.email !== 'rieldiango24@gmail.com') {
  console.error('FAIL: Contact email mismatch');
  process.exit(1);
}
if (profile.contact.phone !== '+63 960 676 8549') {
  console.error('FAIL: Contact phone mismatch');
  process.exit(1);
}
if (profile.contact.facebook !== 'https://facebook.com/realnariel') {
  console.error('FAIL: Contact facebook mismatch');
  process.exit(1);
}

// Ensure no other contact outlets or social accounts are present
const contactKeys = Object.keys(profile.contact);
const allowedContactKeys = ['email', 'phone', 'facebook'];
const extraKeys = contactKeys.filter(k => !allowedContactKeys.includes(k));
if (extraKeys.length > 0) {
  console.error(`FAIL: Extra/unprovided contact keys found: ${extraKeys.join(', ')}`);
  process.exit(1);
}
console.log('PASS: Profile identity and contact details strictly match CONTENT.md (only email, phone, and Facebook).');

// 5. Supabase Client Verification (Graceful Fallback)
if (isSupabaseConfigured !== false || supabase !== null) {
  console.error('FAIL: Supabase should be null / unconfigured when env vars are missing.');
  process.exit(1);
}
console.log('PASS: Supabase utility returns null gracefully when environment variables are not set.');

console.log('--- ALL VERIFICATION CHECKS PASSED SUCCESSFULLY ---');
