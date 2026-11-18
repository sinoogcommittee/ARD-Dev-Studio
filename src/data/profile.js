/**
 * Anthony Riel C. Diango - Profile & Resume Data Source
 * 
 * Strict source of truth: CONTENT.md
 * Centralizes identity, contact details (strictly email, phone, and Facebook),
 * availability, summary, grouped skills, experience, and education/credentials.
 * No invented metrics, testimonials, or unprovided links.
 */

export const profile = {
  identity: {
    name: 'Anthony Riel C. Diango',
    role: 'Full-Stack Web Developer | Technical Support',
    location: 'Guinacot, Guindulman, Bohol, Philippines',
    availability: 'Project-based, freelance, part-time, or full-time remote roles',
    resumeClaim: '16+ live deployed web apps; 10+ years in IT systems and database operations',
    summary: 'Computer Engineer and full-stack developer with experience in software engineering, web development, database systems administration, IT infrastructure, and technical instruction. Builds and deploys production web applications for individuals, agencies, and businesses.'
  },

  contact: {
    email: 'rieldiango24@gmail.com',
    phone: '+63 960 676 8549',
    facebook: 'https://facebook.com/realnariel'
  },

  skills: {
    frontend: [
      'HTML5',
      'CSS3',
      'JavaScript (ES6+, DOM, Fetch API)',
      'React',
      'Tailwind CSS',
      'Responsive mobile-first design',
      'Interactive dashboards'
    ],
    backendAndLanguages: [
      'Supabase (PostgreSQL, Auth, Row-Level Security, Storage)',
      'ASP.NET Core MVC',
      'C#',
      'Java (Spring Boot, JavaFX, Swing)',
      'Python',
      'C/C++'
    ],
    hostingAndIntegrations: [
      'Render',
      'Vercel',
      'Somee (.NET hosting)',
      'Cloudflare R2 media optimization',
      'REST APIs',
      'Payment gateway integrations'
    ],
    systems: [
      'Database architecture and MIS administration',
      'Livestreaming and digital portals',
      'POS and biometrics deployment',
      'LAN/WAN networking'
    ],
    aiAssistedWorkflows: [
      'VS Code',
      'Google Antigravity'
    ]
  },

  experience: [
    {
      role: 'Special Secondary Teacher I, Computer Programming (Java & .NET Technology)',
      organization: 'Department of Education, Fermin Tayabas National High School',
      location: 'Cabayugan, Calape, Bohol',
      period: 'August 2024–present',
      description: 'Teaches senior high school programming; architects and deploys school assessment, weather modality, and athletic tournament applications; writes technical documentation.'
    },
    {
      role: 'Administrative Aide II, Procurement Section & Digital Operations',
      organization: 'Department of Public Works and Highways, Bohol 3rd District Engineering Office',
      location: 'Sawang, Guindulman, Bohol',
      period: 'November 2023–June 2024',
      description: 'Supported livestreaming, online project postings, procurement documentation, compliance reports, and digital routing logs.'
    },
    {
      role: 'Computer Technologist I / Administrative Assistant I (MIS & Database Systems)',
      organization: 'Department of Agriculture Regional Field Office VIII',
      location: 'Tacloban City, Leyte',
      period: 'May 2015–March 2021',
      description: 'Built and maintained BUB and procurement tracking database software; administered MIS workflows and reporting portals; provided Tier-2 support and network operations.'
    },
    {
      role: 'Technical Service Engineer',
      organization: 'Business Machines Corporation',
      location: 'Cagayan de Oro City, Misamis Oriental',
      period: 'October 2013–May 2015',
      description: 'Deployed and supported POS, biometric, CCTV, and office systems; provided client onboarding, training, and LAN cabling.'
    }
  ],

  educationAndCredentials: {
    degrees: [
      {
        degree: 'BS Computer Engineering',
        institution: 'Bohol Island State University – Main Campus, Tagbilaran City',
        period: 'graduated March 2013'
      },
      {
        degree: 'Bachelor of Secondary Education (Qualifying)',
        institution: 'University of Bohol',
        period: '2021–2022'
      }
    ],
    credentials: [
      'TESDA NC II – Computer Systems Servicing',
      'Python Essentials 1, Cisco Networking Academy',
      'Licensure Examination for Teachers',
      'CSC Career Service Professional Eligibility'
    ]
  }
};
