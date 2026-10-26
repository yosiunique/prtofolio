import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EducationItem } from '../../../models/portfolio.models';
import { PortfolioService } from '../../../services/portfolio.service';

interface EducationForm {
  degree: string;
  school: string;
  period: string;
  summary: string;
  logo: string;
}

const emptyForm = (): EducationForm => ({
  degree: '',
  school: '',
  period: '',
  summary: '',
  logo: '',
});

/**
 * Admin CRUD for education entries — create, edit and delete qualifications.
 * All changes persist via PortfolioService and go live across the site.
 */
@Component({
  selector: 'app-admin-education',
  imports: [FormsModule],
  templateUrl: './education.html',
})
export class AdminEducation {
  private readonly portfolio = inject(PortfolioService);

  readonly items = this.portfolio.education;
  readonly showForm = signal(false);
  readonly editingId = signal<string | null>(null);
  readonly pendingDelete = signal<string | null>(null);
  readonly status = signal('');

  form: EducationForm = emptyForm();

  get isEditing(): boolean {
    return this.editingId() !== null;
  }

  startCreate(): void {
    this.editingId.set(null);
    this.form = emptyForm();
    this.showForm.set(true);
    this.status.set('');
  }

  startEdit(item: EducationItem): void {
    this.editingId.set(item.id);
    this.form = {
      degree: item.degree,
      school: item.school,
      period: item.period,
      summary: item.summary,
      logo: item.logo,
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
      degree: this.form.degree.trim(),
      school: this.form.school.trim(),
      period: this.form.period.trim(),
      summary: this.form.summary.trim(),
      logo: this.form.logo.trim() || '/unity.png',
    };

    if (!payload.degree || !payload.school || !payload.period) {
      return;
    }

    const id = this.editingId();
    if (id) {
      this.portfolio.updateEducation(id, payload);
      this.status.set('Education updated — live across the site.');
    } else {
      this.portfolio.addEducation(payload);
      this.status.set('Education created — live across the site.');
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
    this.portfolio.removeEducation(id);
    this.pendingDelete.set(null);
    this.status.set('Education deleted.');
  }
}
