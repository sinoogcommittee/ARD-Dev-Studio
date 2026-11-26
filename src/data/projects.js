/**
 * Anthony Riel C. Diango - Portfolio Projects Data Source
 * 
 * Strict source of truth: CONTENT.md
 * Contains all 20 live deployments with stable IDs, exact categories,
 * titles, concise descriptions, exact HTTPS URLs, stack tags, and featured/highlight flags.
 */

export const PROJECT_CATEGORIES = [
  'All',
  'Healthcare & business operations',
  'Civic, government & tourism',
  'Events, registration & scoring',
  'Education & institutional systems'
];

export const projects = [
  // Healthcare & business operations
  {
    id: 'dentaprime-clinic-portal',
    title: 'DentaPrime Clinic Portal',
    category: 'Healthcare & business operations',
    liveUrl: 'https://dentaprimedemo.onrender.com',
    description: 'Dental clinic management with patient scheduling, treatment tracking, and service catalog.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    featured: true
  },
  {
    id: 'the-boarders-app',
    title: 'The Boarders App',
    category: 'Healthcare & business operations',
    liveUrl: 'https://theboarders.onrender.com',
    description: 'Collaborative shared-household management and automated expense splitting.',
    stack: ['React', 'JavaScript', 'Tailwind CSS'],
    featured: false
  },
  {
    id: 'carls-fried',
    title: 'Carl’s Fried',
    category: 'Healthcare & business operations',
    liveUrl: 'https://carlsfried.onrender.com',
    description: 'Online storefront and ordering web application for a fried food business, featuring a digital menu and customer ordering.',
    stack: ['React', 'Tailwind CSS', 'Supabase'],
    previewImage: '/images/highlight_projects_preview/carlsfried.png',
    highlight: true,
    featured: true
  },

  // Civic, government & tourism
  {
    id: 'ekumbati-district-portal',
    title: 'e-KUMBATI District Portal',
    category: 'Civic, government & tourism',
    liveUrl: 'https://ekumbatidemo.onrender.com',
    description: 'Constituent services with program tracking, action-center request workflows, and directory tools.',
    stack: ['React', 'Tailwind CSS', 'REST APIs'],
    featured: true
  },
  {
    id: 'suroy-guindulman',
    title: 'Suroy Guindulman',
    category: 'Civic, government & tourism',
    liveUrl: 'https://suroyguindulman.onrender.com',
    description: 'Municipal tourism portal showcasing destinations, itineraries, and local guides.',
    stack: ['React', 'Tailwind CSS', 'Cloudflare R2'],
    previewImage: '/images/highlight_projects_preview/suroyguindulman.png',
    highlight: true,
    featured: true
  },
  {
    id: 'guindulman-website',
    title: 'Guindulman Website',
    category: 'Civic, government & tourism',
    liveUrl: 'https://guindulmandemo.onrender.com',
    description: 'Official municipal government web portal featuring citizen services, transparency reports, barangay directory, and emergency hotlines.',
    stack: ['React', 'Tailwind CSS', 'Supabase'],
    featured: false
  },

  // Events, registration & scoring
  {
    id: 'sinoog-2027-event-hub',
    title: 'Sinoog 2027 Event Hub',
    category: 'Events, registration & scoring',
    liveUrl: 'https://sinoog2027.onrender.com',
    description: 'Event registration, participant management, and operational dashboard; React and Supabase.',
    stack: ['React', 'Supabase', 'Tailwind CSS'],
    previewImage: '/images/highlight_projects_preview/sinoog2027.png',
    highlight: true,
    featured: true
  },
  {
    id: 'execon-2026-platform',
    title: 'ExeCon 2026 Platform',
    category: 'Events, registration & scoring',
    liveUrl: 'https://execon.onrender.com',
    description: 'Conference and executive-event logistics, scheduling, and attendee management.',
    stack: ['React', 'JavaScript', 'Tailwind CSS'],
    featured: false
  },
  {
    id: 'bohol-meet-scoring-system',
    title: 'Bohol Meet Scoring System',
    category: 'Events, registration & scoring',
    liveUrl: 'https://boholmeet.onrender.com',
    description: 'Real-time provincial athletic scoring, medal tallying, and results portal.',
    stack: ['React', 'Tailwind CSS', 'Realtime Data'],
    previewImage: '/images/highlight_projects_preview/boholmeet.png',
    highlight: true,
    featured: true
  },
  {
    id: 'congressional-meet-portal',
    title: 'Congressional Meet Portal',
    category: 'Events, registration & scoring',
    liveUrl: 'https://congmeet.onrender.com',
    description: 'Multi-municipality sports competition management and live tabulation.',
    stack: ['React', 'JavaScript', 'Tailwind CSS'],
    featured: false
  },
  {
    id: 'calape-district-meet',
    title: 'Calape District Meet',
    category: 'Events, registration & scoring',
    liveUrl: 'https://calapedistrictmeet.onrender.com',
    description: 'District athletic scoring engine for event encoding and standings.',
    stack: ['React', 'JavaScript', 'Tailwind CSS'],
    featured: false
  },
  {
    id: 'locatu-meet-system',
    title: 'Locatu Meet System',
    category: 'Events, registration & scoring',
    liveUrl: 'https://locatumeet.onrender.com',
    description: 'Sports meet results and event coordination web application.',
    stack: ['React', 'JavaScript', 'Tailwind CSS'],
    featured: false
  },
  {
    id: 'abigail-and-wilt-wedding-hub',
    title: 'Abigail & Wilt Wedding Hub',
    category: 'Events, registration & scoring',
    liveUrl: 'https://abigailandwilt.onrender.com',
    description: 'Event logistics, digital invitation, and personalized RSVP platform.',
    stack: ['React', 'Tailwind CSS', 'Cloudflare R2'],
    featured: false
  },

  // Education & institutional systems
  {
    id: 'smart-ftnhs-management',
    title: 'Smart FTNHS Management',
    category: 'Education & institutional systems',
    liveUrl: 'https://smartftnhs.onrender.com',
    description: 'School operations hub built with React, Tailwind CSS, and Supabase.',
    stack: ['React', 'Tailwind CSS', 'Supabase'],
    featured: true
  },
  {
    id: 'ftnhs-web-portal-net',
    title: 'FTNHS Web Portal (.NET)',
    category: 'Education & institutional systems',
    liveUrl: 'https://ftnhs.somee.com',
    description: 'Institutional school web application built with .NET Technology.',
    stack: ['ASP.NET Core', 'C#', '.NET', 'Somee'],
    featured: false
  },
  {
    id: 'ferminexam-assessment',
    title: 'FerminExam Assessment',
    category: 'Education & institutional systems',
    liveUrl: 'https://ferminexam.onrender.com',
    description: 'Digital examination, automated grading, and student assessment application.',
    stack: ['React', 'JavaScript', 'Tailwind CSS'],
    featured: false
  },
  {
    id: 'ftnhs-weather-hub',
    title: 'FTNHS Weather Hub',
    category: 'Education & institutional systems',
    liveUrl: 'https://ftnhsweatherhub.onrender.com',
    description: 'Decision-support dashboard determining learning modalities from weather thresholds.',
    stack: ['React', 'Tailwind CSS', 'REST APIs'],
    featured: false
  },
  {
    id: 'ftnhs-tinabangay-portal',
    title: 'FTNHS Tinabangay Portal',
    category: 'Education & institutional systems',
    liveUrl: 'https://ftnhstinabangay.onrender.com',
    description: 'School-community support, outreach, and resource coordination platform.',
    stack: ['React', 'Tailwind CSS', 'Supabase'],
    featured: false
  },
  {
    id: 'pangangan-es-library-hub',
    title: 'Pangangan ES Library Hub',
    category: 'Education & institutional systems',
    liveUrl: 'https://pesbooks.onrender.com',
    description: 'Elementary school digital library showcasing storybooks, Philippine folklore, and DepEd learning materials for young readers.',
    stack: ['React', 'Tailwind CSS', 'Supabase'],
    featured: false
  },
  {
    id: 'e-ftnhs-faculty-portal',
    title: 'e-FTNHS Faculty Portal',
    category: 'Education & institutional systems',
    liveUrl: 'https://eftnhs.onrender.com',
    description: 'Integrated school management portal for faculty scheduling, lesson plan auditing, and performance tracking.',
    stack: ['React', 'Tailwind CSS', 'Supabase'],
    featured: false
  }
];
