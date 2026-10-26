import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectItem } from '../../../models/portfolio.models';
import { PortfolioService } from '../../../services/portfolio.service';

interface ProjectForm {
  name: string;
  description: string;
  techText: string;
  repoUrl: string;
  demoUrl: string;
  // --- Case study (public) ---
  type: string;
  orgType: string;
  role: string;
  period: string;
  problem: string;
  solution: string;
  contribution: string;
  featuresText: string;
  architecture: string;
  challengesText: string;
  resultsText: string;
  screenshot: string;
  // --- Confidentiality ---
  visibility: 'public' | 'sanitized';
  internalNotes: string;
}

const emptyForm = (): ProjectForm => ({
  name: '',
  description: '',
  techText: '',
  repoUrl: '',
  demoUrl: '',
  type: '',
  orgType: '',
  role: '',
  period: '',
  problem: '',
  solution: '',
  contribution: '',
  featuresText: '',
  architecture: '',
  challengesText: '',
  resultsText: '',
  screenshot: '',
  visibility: 'public',
  internalNotes: '',
});

/** Trimmed line list -> array, or undefined when empty (clears the field). */
const toList = (text: string): string[] | undefined => {
  const items = text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  return items.length ? items : undefined;
};

/** Trimmed text -> value, or undefined when empty (clears the field). */
const toOptional = (text: string): string | undefined => {
  const value = text.trim();
  return value || undefined;
};

/**
 * Admin CRUD for project entries — create, edit and delete projects.
 * All changes persist via PortfolioService and go live across the site.
 */
@Component({
  selector: 'app-admin-projects',
  imports: [FormsModule],
  templateUrl: './projects.html',
})
export class AdminProjects {
  private readonly portfolio = inject(PortfolioService);

  readonly items = this.portfolio.projects;
  readonly showForm = signal(false);
  readonly editingId = signal<string | null>(null);
  readonly pendingDelete = signal<string | null>(null);
  readonly status = signal('');

  form: ProjectForm = emptyForm();

  get isEditing(): boolean {
    return this.editingId() !== null;
  }

  startCreate(): void {
    this.editingId.set(null);
    this.form = emptyForm();
    this.showForm.set(true);
    this.status.set('');
  }

  startEdit(item: ProjectItem): void {
    this.editingId.set(item.id);
    this.form = {
      name: item.name,
      description: item.description,
      techText: item.tech.join('\n'),
      repoUrl: item.repoUrl ?? '',
      demoUrl: item.demoUrl ?? '',
      type: item.type ?? '',
      orgType: item.orgType ?? '',
      role: item.role ?? '',
      period: item.period ?? '',
      problem: item.problem ?? '',
      solution: item.solution ?? '',
      contribution: item.contribution ?? '',
      featuresText: (item.features ?? []).join('\n'),
      architecture: item.architecture ?? '',
      challengesText: (item.challenges ?? []).join('\n'),
      resultsText: (item.results ?? []).join('\n'),
      screenshot: item.screenshot ?? '',
      visibility: item.visibility ?? 'public',
      internalNotes: item.internalNotes ?? '',
    };
    this.showForm.set(true);
    this.status.set('');
  }

  cancel(): void {
    this.showForm.set(false);
    this.editingId.set(null);
  }

  save(): void {
    const payload: Omit<ProjectItem, 'id'> = {
      name: this.form.name.trim(),
      description: this.form.description.trim(),
      tech: this.form.techText
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean),
      repoUrl: toOptional(this.form.repoUrl),
      demoUrl: toOptional(this.form.demoUrl),
      // case study (public content)
      type: toOptional(this.form.type),
      orgType: toOptional(this.form.orgType),
      role: toOptional(this.form.role),
      period: toOptional(this.form.period),
      problem: toOptional(this.form.problem),
      solution: toOptional(this.form.solution),
      contribution: toOptional(this.form.contribution),
      features: toList(this.form.featuresText),
      architecture: toOptional(this.form.architecture),
      challenges: toList(this.form.challengesText),
      results: toList(this.form.resultsText),
      screenshot: toOptional(this.form.screenshot),
      visibility: this.form.visibility,
      // PRIVATE — admin only, never rendered on the public pages
      internalNotes: toOptional(this.form.internalNotes),
    };

    if (!payload.name || !payload.description) {
      return;
    }

    const id = this.editingId();
    if (id) {
      this.portfolio.updateProject(id, payload);
      this.status.set('Project updated — live across the site.');
    } else {
      this.portfolio.addProject(payload);
      this.status.set('Project created — live across the site.');
    }
    this.showForm.set(false);
    this.editingId.set(null);
  }

  requestDelete(id: string): void {
    this.pendingDelete.set(id);
  }

  cancelDelete(): void {
    this.pendingDelete.set(null);
  }

  confirmDelete(id: string): void {
    this.portfolio.removeProject(id);
    this.pendingDelete.set(null);
    this.status.set('Project deleted.');
  }
}
