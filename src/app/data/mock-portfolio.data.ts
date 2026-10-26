import { PortfolioData } from '../models/portfolio.models';

/**
 * Mock portfolio content — the single source of truth for the whole site.
 *
 * This is placeholder data with the shape of the real backend payload.
 * When the API/CMS is ready, keep this file as fallback data and swap the
 * PortfolioService to fetch the same structure over HTTP.
 *
 * NOTE: contact email/phone below are placeholders — replace them with the
 * real details in this one file and every page updates automatically.
 */
export const PORTFOLIO_MOCK_DATA: PortfolioData = {
  nav: {
    brand: {
      initials: 'YG',
      name: 'Yoseph Getachew',
      tagline: 'Full-Stack Software Engineer',
    },
    links: [
      { label: 'Home', path: '/', exact: true },
      { label: 'About', path: '/about' },
      { label: 'Skills', path: '/skills' },
      { label: 'Education', path: '/education' },
      { label: 'Experience', path: '/experience' },
      { label: 'Projects', path: '/projects' },
      { label: 'Contact', path: '/contact' },
    ],
    adminLinks: [
      { label: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
      { label: 'About Me', path: '/admin/about', icon: '👤' },
      { label: 'Experience', path: '/admin/experience', icon: '💼' },
      { label: 'Projects', path: '/admin/projects', icon: '🚀' },
      { label: 'Education', path: '/admin/education', icon: '🎓' },
      { label: 'Contact', path: '/admin/contact', icon: '✉️' },
      { label: 'Images', path: '/admin/images', icon: '🖼️' },
      { label: 'Messages', path: '/admin/messages', icon: '💬', showUnreadBadge: true },
    ],
  },

  footer: {
    tagline: 'Crafting secure, scalable web applications from concept to production.',
    quickLinks: [
      { label: 'Home', path: '/', exact: true },
      { label: 'About', path: '/about' },
      { label: 'Skills', path: '/skills' },
      { label: 'Projects', path: '/projects' },
      { label: 'Contact', path: '/contact' },
    ],
    socialLinks: [
      { label: 'GitHub', url: 'https://github.com/yosiunique' },
      { label: 'LinkedIn', url: 'https://linkedin.com/in/yosephgetachew' },
      { label: 'Email', url: 'mailto:yosephgetachew@example.com' },
    ],
    rights: 'Yoseph Getachew. All rights reserved.',
  },

  profile: {
    firstName: 'Yoseph',
    fullName: 'Yoseph Getachew',
    initials: 'YG',
    headline: 'Full-Stack Software Engineer',
    role: 'Full-Stack Software Engineer',
    company: 'Enat Bank SC',
    location: 'Addis Ababa, Ethiopia',
    yearsOfExperience: '5+ years',
    photo: '/IMG_6828.JPG',
    // TODO: replace with real contact details
    email: 'yosephgetachew@example.com',
    phone: '+251 912 345 678',
    highlights: [
      "I'm Yoseph Getachew — a full-stack software engineer at Enat Bank SC with 5+ years of experience designing and shipping enterprise web systems.",
      'I own features end-to-end: data model, APIs, UI, tests, and the deployment pipeline that carries them to production.',
      'I build secure, scalable applications with Angular, Spring Boot, and Django — hardened with Spring Security and sensible database design.',
      'I care about readable code, sensible architecture, and software that keeps performing under real-world load.',
      'I mentor teammates through code reviews and design discussions, and I raise the bar on engineering discipline wherever I work.',
      "If you're looking for an engineer who ships — let's talk.",
    ],
    bio: [
      "Hello! I'm Yoseph Getachew, a full-stack software engineer at Enat Bank SC, where I design and build secure, high-performance web systems for the banking sector. Over the past five-plus years I've worked across the entire stack — from Angular front ends and RESTful Spring Boot services to relational database design.",
      'I enjoy taking features from concept to production: shaping the data model, implementing the APIs, crafting the UI, and making sure everything is tested, observable, and maintainable. Collaboration with product, QA, and operations teams is where I do my best work.',
      'Outside of day-to-day delivery I keep sharpening my skills by exploring new technologies and building side projects. My goal is always the same — ship impactful software that solves real problems.',
    ],
  },

  skillGroups: [
    {
      title: 'Frontend',
      skills: [
        'Angular',
        'TypeScript',
        'JavaScript (ES6+)',
        'HTML5 & CSS3',
        'SCSS',
        'RxJS',
        'Responsive Design',
      ],
    },
    {
      title: 'Backend',
      skills: ['Java', 'Spring Boot', 'Spring Security', 'Python', 'Django', 'REST API Design'],
    },
    {
      title: 'Databases & Tools',
      skills: ['PostgreSQL', 'MySQL', 'Git', 'Docker'],
    },
  ],

  experience: [
    {
      id: 'exp-enat-bank',
      role: 'Full-Stack Software Engineer',
      company: 'Enat Bank SC',
      period: 'Jan 2022 – Present',
      location: 'Addis Ababa, Ethiopia',
      summary:
        'Senior full-stack engineer on core banking platforms — architecting features end-to-end, from data model to production deployment, and raising the engineering bar through reviews, testing, and automation.',
      highlights: [
        'Own features end-to-end with Angular front ends and Spring Boot services — database design, APIs, UI, tests, and CI/CD delivery.',
        'Design and maintain versioned RESTful APIs consumed by internal systems and customer-facing channels.',
        'Set the technical direction in sprint planning and design sessions together with product, QA, and DevOps stakeholders.',
        'Implement role-based access control and data-protection measures for sensitive banking workflows.',
        'Refactor and modernize legacy services, cutting release risk with automated tests, runbooks, and observability.',
        'Mentor developers through code reviews, pairing, and on-call support to keep quality and delivery standards high.',
      ],
    },
    {
      id: 'exp-xyz-intern',
      role: 'Software Engineering Intern',
      company: 'XYZ Tech Solutions',
      period: 'Jun 2021 – Dec 2021',
      location: 'Addis Ababa, Ethiopia',
      summary:
        'Supported the engineering team building internal tools and client-facing web applications, shipping features from specification to production under senior mentorship.',
      highlights: [
        'Developed features for internal tools using Django and Angular, from data models to responsive interfaces.',
        'Optimized slow backend queries and endpoints, cutting response times for core operations.',
        'Participated in code reviews, UI refinements, and sprint deliveries alongside senior engineers.',
      ],
    },
  ],

  projects: [
    {
      id: 'proj-sms-service-api',
      slug: 'sms-service-api',
      name: 'smsServiceApi',
      description:
        'Backend microservice for sending and managing SMS notifications with delivery tracking, template management, and rate limiting — designed for scalable enterprise communication.',
      tech: ['Spring Boot', 'Twilio API', 'PostgreSQL', 'REST API'],
      type: 'Backend Service',
      orgType: 'Enterprise internal platform',
      role: 'Backend Engineer',
      problem:
        'Applications across the organization each sent SMS their own way — no shared templates, no delivery visibility, and no protection against runaway message volume.',
      solution:
        'A dedicated Spring Boot microservice exposing a REST API for template-based SMS dispatch, per-client rate limiting, and end-to-end delivery tracking.',
      contribution:
        'Designed the service API, the template management module, the delivery-tracking pipeline and the rate-limiting rules, and integrated the provider with status callbacks.',
      features: [
        'Template management with per-use-case rendering',
        'Delivery status tracking with provider callbacks',
        'Per-client rate limiting',
        'REST API for internal consumers',
        'Send history for auditing',
      ],
      architecture:
        'Stateless Spring Boot service behind the internal API gateway; PostgreSQL stores templates, send history and delivery logs; provider callbacks update delivery status asynchronously.',
      challenges: [
        'Keeping delivery status accurate when provider callbacks arrive out of order',
        'Rate limiting without blocking bursty internal callers',
      ],
      results: [
        'One shared SMS channel for enterprise applications instead of ad-hoc integrations',
        'Auditable delivery history per message and template',
      ],
      visibility: 'sanitized',
      internalNotes:
        'Internal: provider account ids and gateway endpoints live in the ops wiki — never publish them.',
    },
    {
      id: 'proj-fingerprint-attendance',
      slug: 'fingerprint-attendance',
      name: 'FingerPrintAttendance',
      description:
        'Biometric attendance system that captures fingerprint check-ins and provides real-time presence dashboards for employees and students.',
      tech: ['Java', 'Spring Boot', 'DigitalPersona SDK', 'MySQL'],
      type: 'Full-Stack System',
      orgType: 'Organizations & education',
      role: 'Full-Stack Software Engineer',
      problem:
        'Manual attendance registers are slow to fill, easy to falsify, and painful to audit for organizations with many employees and students.',
      solution:
        'Check-in terminals capture fingerprint scans through the DigitalPersona SDK and feed a real-time presence dashboard backed by a Spring Boot service.',
      contribution:
        'Built the fingerprint capture-to-database pipeline, the employee/student records, and the live presence dashboard.',
      features: [
        'Fingerprint check-in via DigitalPersona SDK',
        'Real-time presence dashboard',
        'Employee & student attendance records',
        'Daily and per-person attendance history',
      ],
      architecture:
        'Java/Spring Boot service integrating the DigitalPersona SDK on check-in terminals; MySQL persistence; dashboard consumed by the web frontend.',
      challenges: [
        'Handling unreliable scans (rejected matches) without blocking the check-in queue',
        'Keeping terminal clocks and records consistent across devices',
      ],
      results: [
        'Instant, tamper-resistant attendance records',
        'Live presence monitoring instead of end-of-day paper reconciliation',
      ],
      visibility: 'public',
    },
    {
      id: 'proj-e-teacher-platform',
      slug: 'e-teacher-platform',
      name: 'e-Teacher Platform',
      description:
        'Interactive e-learning platform connecting teachers and students with virtual classrooms, file sharing, assignments, and quiz modules.',
      tech: ['Angular', 'Django', 'PostgreSQL'],
      type: 'Web Platform',
      orgType: 'Education',
      role: 'Full-Stack Software Engineer',
      problem:
        'Teachers and students needed one place for classes, assignments and quizzes when interaction could no longer happen only in person.',
      solution:
        'An interactive platform combining virtual classrooms, file sharing, assignment workflows and quiz modules in a single system.',
      contribution:
        'Built the Angular application frontend and the Django REST endpoints behind classrooms, assignments and quizzes.',
      features: [
        'Virtual classrooms',
        'Assignment submission and grading',
        'Quiz modules',
        'File sharing between teachers and students',
      ],
      architecture:
        'Angular single-page application against a Django REST backend; PostgreSQL for users, classrooms, submissions and quiz results.',
      challenges: [
        'Keeping assignment state (draft/submitted/graded) consistent for both roles',
        'File uploads that survive flaky student connections',
      ],
      results: ['End-to-end teaching workflow — class, assignment and quiz — in one platform'],
      visibility: 'public',
    },
    {
      id: 'proj-school-payments',
      slug: 'school-payments',
      name: 'School Payments',
      description:
        'Digital fee-management platform for schools with payment tracking, reconciliation reporting, and bank integration.',
      tech: ['Spring Boot', 'Angular', 'Enat Bank API', 'MySQL'],
      type: 'Enterprise Platform',
      orgType: 'Education & banking',
      role: 'Full-Stack Software Engineer',
      problem:
        'School fee collection lived across paper receipts and disconnected bank statements, making reconciliation slow and error-prone.',
      solution:
        'A digital fee-management platform with per-student payment tracking, bank integration, and generated reconciliation reports.',
      contribution:
        'Built the payment capture and tracking flows, the reconciliation reporting, and the bank API integration layer.',
      features: [
        'Fee tracking per student and per term',
        'Bank-integrated payment confirmation',
        'Reconciliation reporting for finance teams',
        'Payment history per student',
      ],
      architecture:
        'Spring Boot backend integrating with the bank API; Angular console for school administrators; MySQL storing payments and reconciliation records.',
      challenges: [
        'Matching asynchronous bank confirmations back to the correct student account',
        'Idempotent payment processing to avoid double crediting',
      ],
      results: [
        'Reconciliation reduced from manual cross-checks to generated reports',
        'Traceable payment history per student',
      ],
      visibility: 'sanitized',
      internalNotes:
        'Internal: bank integration endpoints and contact persons are documented in the internal wiki — the public case study keeps them anonymous.',
    },
    {
      id: 'proj-resource-handle',
      slug: 'resource-handle',
      name: 'Resource Handle',
      description:
        'Resource and asset management tool that helps organizations allocate, track, and monitor hardware and software inventory.',
      tech: ['Django', 'Angular', 'Docker', 'REST API'],
      type: 'Internal Tool',
      orgType: 'Enterprise IT operations',
      role: 'Full-Stack Software Engineer',
      problem:
        'Hardware and software inventory was spread across spreadsheets — nobody had a reliable answer to “who holds which asset, and in what state?”.',
      solution:
        'An asset management tool that centralizes allocation, tracking and status monitoring for hardware and software inventory.',
      contribution:
        'Developed the Django REST backend (assets, assignments, status history) and the Angular frontend for allocation and reporting.',
      features: [
        'Asset allocation and assignment per person/department',
        'Inventory status tracking (active, repair, retired)',
        'REST API for integration with other internal tools',
        'Dockerized deployment',
      ],
      architecture:
        'Django REST backend with an Angular frontend, containerized with Docker and consumed through a documented REST API.',
      challenges: [
        'Modeling asset lifecycle states without losing history',
        'Importing legacy spreadsheet inventories cleanly',
      ],
      results: [
        'A single source of truth for asset ownership and status',
        'Faster audits with full allocation history',
      ],
      visibility: 'public',
    },
  ],

  education: [
    {
      id: 'edu-unity-university',
      degree: 'Bachelor of Science in Computer Science',
      school: 'Unity University',
      // TODO: confirm actual graduation years
      period: '2019 – 2023',
      summary:
        'Focused on software engineering, algorithms, and database systems; completed capstone projects in web application development.',
      logo: '/unity.png',
    },
  ],

  contact: {
    intro:
      "I'm open to interesting opportunities and collaborations. Whether you have a question, a project idea, or just want to say hello — my inbox is always open.",
    // TODO: replace placeholder contact details with real ones
    email: 'yosephgetachew@example.com',
    phone: '+251 912 345 678',
    location: 'Addis Ababa, Ethiopia',
    availability: 'Open to freelance & full-time opportunities',
    linkedin: 'https://linkedin.com/in/yosephgetachew',
    github: 'https://github.com/yosiunique',
  },
};
