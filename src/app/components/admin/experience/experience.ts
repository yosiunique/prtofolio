import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExperienceItem } from '../../../models/portfolio.models';
import { PortfolioService } from '../../../services/portfolio.service';

interface ExperienceForm {
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  highlightsText: string;
}

const emptyForm = (): ExperienceForm => ({
  role: '',
  company: '',
  period: '',
  location: '',
  summary: '',
  highlightsText: '',
});

/**
 * Admin CRUD for experience entries — create, edit and delete roles.
 * All changes persist via PortfolioService and go live across the site.
 */
@Component({
  selector: 'app-admin-experience',
  imports: [FormsModule],
  templateUrl: './experience.html',
})
export class AdminExperience {
  private readonly portfolio = inject(PortfolioService);

  readonly items = this.portfolio.experience;
  readonly showForm = signal(false);
  readonly editingId = signal<string | null>(null);
  readonly pendingDelete = signal<string | null>(null);
  readonly status = signal('');

  form: ExperienceForm = emptyForm();

  get isEditing(): boolean {
    return this.editingId() !== null;
  }

  startCreate(): void {
    this.editingId.set(null);
    this.form = emptyForm();
    this.showForm.set(true);
    this.status.set('');
  }

  startEdit(item: ExperienceItem): void {
    this.editingId.set(item.id);
    this.form = {
      role: item.role,
      company: item.company,
      period: item.period,
      location: item.location ?? '',
      summary: item.summary,
      highlightsText: item.highlights.join('\n'),
    };
    this.showForm.set(true);
    this.status.set('');
  }

  cancel(): void {
    this.showForm.set(false);
    this.editingId.set(null);
  }

  save(): void {
    const payload = {
      role: this.form.role.trim(),
      company: this.form.company.trim(),
      period: this.form.period.trim(),
      location: this.form.location.trim() || undefined,
      summary: this.form.summary.trim(),
      highlights: this.form.highlightsText
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean),
    };

    if (!payload.role || !payload.company || !payload.period) {
      return;
    }

    const id = this.editingId();
    if (id) {
      this.portfolio.updateExperience(id, payload);
      this.status.set('Experience updated — live across the site.');
    } else {
      this.portfolio.addExperience(payload);
      this.status.set('Experience created — live across the site.');
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
    this.portfolio.removeExperience(id);
    this.pendingDelete.set(null);
    this.status.set('Experience deleted.');
  }
}
