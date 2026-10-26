import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { PORTFOLIO_MOCK_DATA } from '../data/mock-portfolio.data';
import {
  Brand,
  ContactContent,
  EducationItem,
  ExperienceItem,
  FooterContent,
  NavContent,
  PortfolioData,
  Profile,
  ProjectItem,
  SkillGroup,
} from '../models/portfolio.models';

const STORE_KEY = 'yg_portfolio_content';

/** Editable slices persisted by the admin CRUD operations. */
interface StoredContent {
  profile?: Partial<Profile>;
  contact?: Partial<ContactContent>;
  experience?: ExperienceItem[];
  projects?: ProjectItem[];
  education?: EducationItem[];
}

/**
 * Single access point for all portfolio content.
 *
 * Static slices (nav, footer, skill groups) are served straight from the mock
 * data. Editable slices (profile, experience, projects, education, contact)
 * are signals managed by the admin CRUD pages and persisted to `localStorage`
 * as a mock database. When a backend is available, replace `read`/`persist`
 * with HTTP calls — the public API of this service stays the same.
 */
@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly defaults: PortfolioData = PORTFOLIO_MOCK_DATA;
  private readonly stored: StoredContent = this.read<StoredContent>(STORE_KEY) ?? {};

  // --- Static slices (mock data only) ---
  readonly nav: NavContent = this.defaults.nav;
  readonly brand: Brand = this.defaults.nav.brand;
  readonly footer: FooterContent = this.defaults.footer;
  readonly skillGroups: SkillGroup[] = this.defaults.skillGroups;

  // --- Editable slices (admin CRUD + live site updates) ---
  readonly profile = signal<Profile>({ ...this.defaults.profile, ...this.stored.profile });
  readonly contact = signal<ContactContent>({ ...this.defaults.contact, ...this.stored.contact });
  readonly experience = signal<ExperienceItem[]>(
    this.withIds(this.stored.experience ?? this.defaults.experience),
  );
  readonly projects = signal<ProjectItem[]>(
    this.withIds(this.stored.projects ?? this.defaults.projects),
  );
  readonly education = signal<EducationItem[]>(
    this.withIds(this.stored.education ?? this.defaults.education),
  );

  // --- Experience CRUD ---
  addExperience(item: Omit<ExperienceItem, 'id'>): void {
    this.experience.update((list) => [{ ...item, id: this.createId() }, ...list]);
    this.persist();
  }

  updateExperience(id: string, patch: Omit<ExperienceItem, 'id'>): void {
    this.experience.update((list) =>
      list.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
    this.persist();
  }

  removeExperience(id: string): void {
    this.experience.update((list) => list.filter((item) => item.id !== id));
    this.persist();
  }

  // --- Projects CRUD ---
  addProject(item: Omit<ProjectItem, 'id'>): void {
    this.projects.update((list) => [{ ...item, id: this.createId() }, ...list]);
    this.persist();
  }

  /**
   * URL slug used by the public case-study page (/projects/:slug).
   * Falls back to a slugified name when no explicit slug is set.
   */
  slugOf(project: ProjectItem): string {
    return project.slug ? project.slug : this.slugify(project.name);
  }

  /** Finds a project for the /projects/:slug route (also matches the id). */
  projectBySlug(slug: string): ProjectItem | undefined {
    const wanted = (slug ?? '').toLowerCase();
    return this.projects().find(
      (project) => this.slugOf(project).toLowerCase() === wanted || project.id === wanted,
    );
  }

  private slugify(value: string): string {
    return String(value)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  updateProject(id: string, patch: Omit<ProjectItem, 'id'>): void {
    this.projects.update((list) =>
      list.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
    this.persist();
  }

  removeProject(id: string): void {
    this.projects.update((list) => list.filter((item) => item.id !== id));
    this.persist();
  }

  // --- Education CRUD ---
  addEducation(item: Omit<EducationItem, 'id'>): void {
    this.education.update((list) => [{ ...item, id: this.createId() }, ...list]);
    this.persist();
  }

  updateEducation(id: string, patch: Omit<EducationItem, 'id'>): void {
    this.education.update((list) =>
      list.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
    this.persist();
  }

  removeEducation(id: string): void {
    this.education.update((list) => list.filter((item) => item.id !== id));
    this.persist();
  }

  // --- Singleton content (About Me / Contact) ---
  updateProfile(patch: Partial<Profile>): void {
    this.profile.update((current) => ({ ...current, ...patch }));
    this.persist();
  }

  updateContact(patch: Partial<ContactContent>): void {
    this.contact.update((current) => ({ ...current, ...patch }));
    this.persist();
  }

  /** Restores every editable slice back to the original mock defaults. */
  resetContent(): void {
    this.profile.set({ ...this.defaults.profile });
    this.contact.set({ ...this.defaults.contact });
    this.experience.set(this.withIds(this.defaults.experience));
    this.projects.set(this.withIds(this.defaults.projects));
    this.education.set(this.withIds(this.defaults.education));
    this.persist();
  }

  private withIds<T extends { id: string }>(items: T[]): T[] {
    return items.map((item) => (item.id ? item : { ...item, id: this.createId() }));
  }

  private createId(): string {
    return typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `item-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }

  // --- Mock persistence layer (swap for HTTP when the API is ready) ---

  private persist(): void {
    if (!this.isBrowser) {
      return;
    }
    const content: StoredContent = {
      profile: this.profile(),
      contact: this.contact(),
      experience: this.experience(),
      projects: this.projects(),
      education: this.education(),
    };
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(content));
    } catch {
      // Storage full or unavailable (private mode) — state still works in memory.
    }
  }

  private read<T>(key: string): T | null {
    if (!this.isBrowser) {
      return null;
    }
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  }
}
