import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PortfolioService } from '../../../services/portfolio.service';

interface AboutForm {
  fullName: string;
  headline: string;
  role: string;
  company: string;
  location: string;
  yearsOfExperience: string;
  email: string;
  phone: string;
  bioText: string;
}

/**
 * Admin editor for the About Me content (profile singleton).
 * Saving updates the home hero, about page and sidebar in one go.
 */
@Component({
  selector: 'app-admin-about',
  imports: [FormsModule],
  templateUrl: './about.html',
})
export class AdminAbout {
  private readonly portfolio = inject(PortfolioService);

  readonly status = signal('');

  form: AboutForm = this.fromProfile();

  save(): void {
    const payload = {
      fullName: this.form.fullName.trim(),
      firstName: this.form.fullName.trim().split(' ')[0] || '',
      headline: this.form.headline.trim(),
      role: this.form.role.trim(),
      company: this.form.company.trim(),
      location: this.form.location.trim(),
      yearsOfExperience: this.form.yearsOfExperience.trim(),
      email: this.form.email.trim(),
      phone: this.form.phone.trim(),
      bio: this.form.bioText
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean),
    };

    if (!payload.fullName || !payload.headline) {
      return;
    }

    this.portfolio.updateProfile(payload);
    this.status.set('About Me updated — live across the site.');
  }

  resetForm(): void {
    this.form = this.fromProfile();
    this.status.set('Changes discarded.');
  }

  private fromProfile(): AboutForm {
    const profile = this.portfolio.profile();
    return {
      fullName: profile.fullName,
      headline: profile.headline,
      role: profile.role,
      company: profile.company,
      location: profile.location,
      yearsOfExperience: profile.yearsOfExperience,
      email: profile.email,
      phone: profile.phone,
      bioText: profile.bio.join('\n'),
    };
  }
}
