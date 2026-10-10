/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT
 *
 *  Every piece of text, link and image on the site lives in this file.
 *  Edit it to update the site; the components never need to change.
 *
 *  Search for "TODO" to find everything that still needs your input.
 *
 *  Note: this file is also imported by vite.config.ts (to fill in the SEO
 *  tags in index.html), so keep it plain data, with no React or
 *  import.meta.env usage.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ───────────────────────────── Types ───────────────────────────── */

export type SocialIcon = 'github' | 'linkedin' | 'email'

export interface SocialLink {
  label: string
  href: string
  icon: SocialIcon
}

export interface NavItem {
  /** Must match a section id below (about, skills, …). */
  id: SectionId
  label: string
}

export type SectionId = 'about' | 'skills' | 'experience' | 'projects' | 'education' | 'contact'

export interface SectionCopy {
  /** Small mono label above the heading, e.g. "about". */
  eyebrow: string
  title: string
  description?: string
}

export interface SkillGroup {
  category: string
  items: string[]
}

export interface ExperienceItem {
  role: string
  company: string
  companyUrl?: string
  companyDescription?: string
  /** e.g. "Mar 2025". Leave empty to show only the end value. */
  start: string
  /** e.g. "Present" or "Dec 2026". */
  end: string
  location?: string
  highlights: string[]
  tech: string[]
}

export interface Project {
  title: string
  subtitle: string
  description: string
  tags: string[]
  /** Path inside /public, e.g. "/projects/my-app.webp". Recommended size 1200×750 (16:10). */
  image: string
  imageAlt: string
  /** Remove (or leave empty) to hide the button. */
  github?: string
  /** Remove (or leave empty) to hide the button. */
  demo?: string
}

export interface EducationItem {
  degree: string
  field?: string
  institution: string
  location: string
  period: string
  details?: string[]
}

export interface Certification {
  name: string
  year: string
  issuer?: string
}

export interface Fact {
  label: string
  value: string
}

/* ─────────────────── Handles (edit once, used everywhere) ─────────────────── */

const GITHUB_USERNAME = 'Nirbhik-Shrestha'
const LINKEDIN_URL = 'https://www.linkedin.com/in/nirbhik-shrestha/'
const EMAIL = 'nirbhik2k60@gmail.com'
const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`

/* ───────────────────────────── Site ───────────────────────────── */

export const site = {
  name: 'Nirbhik Shrestha',
  /** Shown in the navbar logo as <Nirbhik />. */
  firstName: 'Nirbhik',
  title: 'Full-Stack Developer',
  tagline: 'Building practical web applications with React, Node, PHP and MySQL.',
  /** Phrases cycled by the typewriter in the hero. */
  rotatingTitles: ['Full-Stack Developer', 'WordPress & Shopify Dev', 'React Enthusiast'],
  location: 'Kathmandu, Nepal',
  email: EMAIL,
  github: GITHUB_URL,
  /** The PDF goes in /public with exactly this name. */
  resumeUrl: '/Nirbhik_Shrestha_Resume.pdf',
  /** The deployed URL (no trailing slash). Used for the canonical link, Open Graph/Twitter image URLs and sitemap.xml. */
  url: 'https://nirbhikshrestha.com.np',
}

/* ───────────────────────────── SEO ───────────────────────────── */

export const seo = {
  title: 'Nirbhik Shrestha · Full-Stack Developer in Kathmandu',
  description:
    'Portfolio of Nirbhik Shrestha, a full-stack developer in Kathmandu, Nepal, building practical web apps with React, Node.js, PHP and MySQL, plus WordPress and Shopify sites.',
  /** Path inside /public. 1200×630 PNG or JPG. */
  // TODO: replace public/og-image.png with your own social preview image.
  image: '/og-image.png',
  imageAlt: 'Nirbhik Shrestha, Full-Stack Developer',
  /** Optional, e.g. "@yourhandle". Leave empty if you don't use X/Twitter. */
  twitterHandle: '',
  keywords: [
    'Nirbhik Shrestha',
    'Full-Stack Developer',
    'React Developer',
    'WordPress Developer',
    'Shopify Developer',
    'Kathmandu',
    'Nepal',
  ],
}

/* ───────────────────────────── Navigation ───────────────────────────── */

export const nav: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

/* ───────────────────────────── Socials ───────────────────────────── */

export const socials: SocialLink[] = [
  { label: 'GitHub', href: GITHUB_URL, icon: 'github' },
  { label: 'LinkedIn', href: LINKEDIN_URL, icon: 'linkedin' },
  { label: 'Email', href: `mailto:${EMAIL}`, icon: 'email' },
]

/* ───────────────────────────── Hero ───────────────────────────── */

export const hero = {
  greeting: "Hi, I'm",
  primaryCta: { label: 'View Projects', href: '#projects' },
  resumeCta: { label: 'Download Resume' },
  /** The little code window on large screens. Values are strings or string lists. */
  codeCard: {
    filename: 'nirbhik.ts',
    variable: 'developer',
    fields: {
      name: 'Nirbhik Shrestha',
      role: 'Full-Stack Developer',
      location: 'Kathmandu, Nepal',
      stack: ['React', 'Node', 'PHP', 'MySQL'],
      cms: ['WordPress', 'Shopify'],
      languages: ['English', 'Nepali', 'Hindi'],
    } as Record<string, string | string[]>,
  },
}

/* ───────────────────────────── Section headings ───────────────────────────── */

export const sections: Record<SectionId, SectionCopy> = {
  about: { eyebrow: 'about', title: 'A bit about me' },
  skills: {
    eyebrow: 'skills',
    title: 'Tools I work with',
    description: 'Things I use for client work and for my own projects.',
  },
  experience: { eyebrow: 'experience', title: 'Where I work' },
  projects: {
    eyebrow: 'projects',
    title: 'Things I’ve built',
    description: 'Full-stack projects built with PHP/MySQL, the MERN stack, and some machine learning.',
  },
  education: { eyebrow: 'education', title: 'Education & certification' },
  contact: {
    eyebrow: 'contact',
    title: 'Let’s build something',
    description:
      'Have a project in mind, a role to fill, or just want to say hi? Send me a message and I’ll reply as soon as I can.',
  },
}

/* ───────────────────────────── About ───────────────────────────── */

export const about = {
  paragraphs: [
    "Hi, I'm Nirbhik, a frontend developer at SmartSites, a digital agency, where I build and maintain client websites on WordPress, WooCommerce and Shopify. On a typical day I might be building an ACF flexible-content block, fixing a checkout issue, or sorting out DNS and hosting for one of the many client accounts I look after.",
    "I'm also finishing my Bachelor of Computer Application at Thames International College. Outside the agency work, I build full-stack apps with the MERN stack and PHP/MySQL, such as a doctor appointment system with a heart-disease prediction model and a mental health support platform.",
    'What I enjoy most is using technology to solve real problems for real people. I speak English, Nepali and Hindi, and I live in Kathmandu, Nepal.',
  ],
  facts: [
    { label: 'Currently', value: 'Frontend Developer @ SmartSites' },
    { label: 'Studying', value: 'BCA, Thames International College' },
    { label: 'Based in', value: 'Kathmandu, Nepal' },
    { label: 'Speaks', value: 'English · Nepali · Hindi' },
  ] as Fact[],
}

/* ───────────────────────────── Skills ───────────────────────────── */

export const skills: SkillGroup[] = [
  { category: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'PHP'] },
  { category: 'Databases', items: ['MySQL', 'MongoDB'] },
  { category: 'Languages', items: ['Java', 'C', 'C#', 'Python'] },
  { category: 'Platforms & CMS', items: ['WordPress', 'WooCommerce', 'Shopify', 'Squarespace'] },
  { category: 'Tools', items: ['Git', 'VS Code', 'Postman', 'MS Office'] },
]

/* ───────────────────────────── Experience ───────────────────────────── */

export const experience: ExperienceItem[] = [
  {
    role: 'Frontend Developer',
    company: 'SmartSites',
    companyUrl: 'https://www.smartsites.com/',
    companyDescription: 'Digital agency',
    start: 'November 2025',
    end: 'Present',
    highlights: [
      'Develop and maintain client sites on WordPress/WooCommerce and Shopify, including ACF flexible content blocks, custom post types, multisite themes and schema markup.',
      'Handle ecommerce, DNS, hosting configuration and ad hoc client support across multiple accounts at once.',
    ],
    tech: ['WordPress', 'WooCommerce', 'Shopify', 'ACF', 'PHP', 'JavaScript', 'DNS & Hosting'],
  },
]

/* ───────────────────────────── Projects ─────────────────────────────
 * To add a project, copy one of the objects below and edit it.
 * Put screenshots in /public/projects/ (1200×750 .webp or .jpg recommended).
 */

export const projects: Project[] = [
  {
    title: 'DaaktarSahaab',
    subtitle: 'Doctor Appointment System with Heart Disease Detection',
    description:
      'Full-stack PHP/MySQL web app for appointment booking and doctor schedule management, with an integrated Python Random Forest model that predicts heart disease from clinical data. Features session management, doctor/patient management and scheduling.',
    tags: ['PHP', 'MySQL', 'Python', 'Machine Learning'],
    // TODO: replace the placeholder with a real screenshot.
    image: '/projects/daaktarsahaab.svg',
    imageAlt: 'Screenshot of the DaaktarSahaab doctor appointment dashboard',
    // TODO: check the repo name and add a live demo URL (or delete the demo line to hide the button).
    github: `${GITHUB_URL}/daaktarsahaab`,
    demo: 'https://example.com/daaktarsahaab',
  },
  {
    title: 'Sangeet',
    subtitle: 'Online Music Instrument Store',
    description:
      'Ecommerce site built with PHP and MySQL featuring cart, stock management, cookies/session handling and payment integration.',
    tags: ['PHP', 'MySQL', 'Ecommerce'],
    // TODO: replace the placeholder with a real screenshot.
    image: '/projects/sangeet.svg',
    imageAlt: 'Screenshot of the Sangeet music instrument store homepage',
    // TODO: check the repo name and add a live demo URL (or delete the demo line to hide the button).
    github: `${GITHUB_URL}/sangeet`,
    demo: 'https://example.com/sangeet',
  },
  {
    title: 'Aashraya',
    subtitle: 'Mental Health Awareness and Support System',
    description:
      'MERN-stack platform with sentiment analysis using a pre-trained ML model, mood logging, streaks, anonymous forum posting, blogs and guided breathing tools.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'ML'],
    // TODO: replace the placeholder with a real screenshot.
    image: '/projects/aashraya.svg',
    imageAlt: 'Screenshot of the Aashraya mood logging dashboard',
    // TODO: check the repo name and add a live demo URL (or delete the demo line to hide the button).
    github: `${GITHUB_URL}/aashraya`,
    demo: 'https://example.com/aashraya',
  },
]

/** Shown under the project grid. Set to '' to hide. */
export const moreProjectsUrl = GITHUB_URL

/* ───────────────────────────── Education ───────────────────────────── */

export const education: EducationItem[] = [
  {
    degree: 'Bachelor of Computer Application (BCA)',
    institution: 'Thames International College',
    location: 'Old Baneshwor, Kathmandu',
    period: 'Dec 2021 – Present',
    details: ['Relevant courses: Java Programming, Web Development, DBMS, Computer Networks'],
  },
  {
    degree: 'Higher Secondary Education (+2)',
    field: 'Science',
    institution: 'Kathmandu Model College',
    location: 'Bagbazar, Kathmandu',
    period: '2021',
  },
]

export const certifications: Certification[] = [
  // TODO (optional): add the issuing institute, e.g. issuer: 'XYZ Institute'.
  { name: 'Web Design and Development', year: '2022' },
]

/* ───────────────────────────── Contact & footer ───────────────────────────── */

export const contact = {
  formHeading: 'Send a message',
  emailLabel: 'Prefer email?',
  successMessage: 'Thanks for reaching out! Your message has been sent and I’ll reply soon.',
}

export const footer = {
  builtWith: 'Built with React & Tailwind',
}
