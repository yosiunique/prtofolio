import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PortfolioService } from '../../../services/portfolio.service';

interface ContactForm {
  intro: string;
  email: string;
  phone: string;
  location: string;
  availability: string;
  linkedin: string;
  github: string;
}

/**
 * Admin editor for the Contact content (singleton).
 * Saving updates the contact page cards and links instantly.
 */
@Component({
  selector: 'app-admin-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
})
export class AdminContact {
  private readonly portfolio = inject(PortfolioService);

  readonly status = signal('');

  form: ContactForm = this.fromContact();

  save(): void {
    const payload = {
      intro: this.form.intro.trim(),
      email: this.form.email.trim(),
      phone: this.form.phone.trim(),
      location: this.form.location.trim(),
      availability: this.form.availability.trim(),
      linkedin: this.form.linkedin.trim(),
      github: this.form.github.trim(),
    };

    if (!payload.email) {
      return;
    }

    this.portfolio.updateContact(payload);
    this.status.set('Contact details updated — live across the site.');
  }

  resetForm(): void {
    this.form = this.fromContact();
    this.status.set('Changes discarded.');
  }

  private fromContact(): ContactForm {
    const contact = this.portfolio.contact();
    return {
      intro: contact.intro,
      email: contact.email,
      phone: contact.phone,
      location: contact.location,
      availability: contact.availability,
      linkedin: contact.linkedin,
      github: contact.github,
    };
  }
}
