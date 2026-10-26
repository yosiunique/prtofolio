/**
 * Central type definitions for all portfolio content.
 *
 * Every section of the site (nav, footer, home, about, skills, experience,
 * projects, education, contact) is typed here so the content can later be
 * served by a real API without touching any component templates.
 */

export interface NavLink {
  label: string;
  path: string;
  /** Marks links that should only highlight on an exact route match (e.g. Home). */
  exact?: boolean;
  /** Glyph rendered before the label inside the sidebar navigation. */
  icon?: string;
  /** When true, the sidebar renders the live unread chat count on this link. */
  showUnreadBadge?: boolean;
}

export interface Brand {
  initials: string;
  name: string;
  tagline: string;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface NavContent {
  brand: Brand;
  links: NavLink[];
  /** Administration sub-menu rendered as its own sidebar section. */
  adminLinks: NavLink[];
}

export interface FooterContent {
  tagline: string;
  quickLinks: NavLink[];
  socialLinks: SocialLink[];
  rights: string;
}

export interface Profile {
  firstName: string;
  fullName: string;
  initials: string;
  headline: string;
  role: string;
  company: string;
  location: string;
  yearsOfExperience: string;
  photo: string;
  email: string;
  phone: string;
  /** Short rotating statements shown on the home hero. */
  highlights: string[];
  /** Paragraphs rendered on the About page. */
  bio: string[];
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface ExperienceItem {
  /** Stable identifier used for CRUD updates/deletes and list tracking. */
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  summary: string;
  highlights: string[];
}

export interface ProjectItem {
  /** Stable identifier used for CRUD updates/deletes and list tracking. */
  id: string;
  /** Public URL segment for the case-study page (/projects/:slug). Derived from the name when omitted. */
  slug?: string;
  name: string;
  description: string;
  tech: string[];
  repoUrl?: string;
  demoUrl?: string;

  // --- Case study (all optional : older/simpler entries still render) ---
  /** Project category, e.g. 'Enterprise Platform', 'Backend Service'. */
  type?: string;
  /** Client / organization type, e.g. 'Enterprise banking', 'Education'. */
  orgType?: string;
  role?: string;
  period?: string;
  /** Business problem the system solves. */
  problem?: string;
  /** Proposed/implemented solution. */
  solution?: string;
  /** My personal contribution. */
  contribution?: string;
  features?: string[];
  architecture?: string;
  challenges?: string[];
  results?: string[];
  /** Sanitized / demo screenshot only — never internal captures. */
  screenshot?: string;
  /**
   * Confidentiality of the published case study:
   *  - 'public'    : safe to publish as-is
   *  - 'sanitized' : client-identifying/internal details removed
   */
  visibility?: 'public' | 'sanitized';
  /**
   * PRIVATE notes for the admin only — this key is never rendered by any
   * public component (no internal URLs, credentials or client data).
   */
  internalNotes?: string;
}

export interface EducationItem {
  /** Stable identifier used for CRUD updates/deletes and list tracking. */
  id: string;
  degree: string;
  school: string;
  period: string;
  summary: string;
  logo: string;
}

export interface ContactContent {
  intro: string;
  email: string;
  phone: string;
  location: string;
  availability: string;
  linkedin: string;
  github: string;
}

export interface PortfolioData {
  nav: NavContent;
  footer: FooterContent;
  profile: Profile;
  skillGroups: SkillGroup[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  contact: ContactContent;
}

/** An image managed from the admin area (uploaded files become data-URLs). */
export interface GalleryImage {
  id: string;
  name: string;
  /** Data-URL for uploaded files, or a public asset path for bundled images. */
  url: string;
  /** ISO timestamp of when the image was added. */
  addedAt: string;
}

/** A single chat message exchanged between a visitor and the site owner. */
export interface ChatMessage {
  id: string;
  /** 'visitor' = sent from the public chat widget, 'me' = replied from the admin area. */
  author: 'visitor' | 'me';
  /** Display name of the sender. */
  name: string;
  text: string;
  /** ISO timestamp. */
  sentAt: string;
  /** Visitor messages start unread until the admin opens the inbox. */
  read: boolean;
}
