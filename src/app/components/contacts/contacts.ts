import { Component, computed, inject } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-contacts',
  imports: [],
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss',
})
export class Contacts {
  private readonly portfolio = inject(PortfolioService);

  /** Contact details are dynamic — served from mock data today, API later. */
  readonly contact = this.portfolio.contact;

  /** Recomputed whenever the admin updates the contact details. */
  readonly mailtoHref = computed(
    () => `mailto:${this.contact().email}?subject=Portfolio%20Inquiry`,
  );
  readonly telHref = computed(() => `tel:${this.contact().phone.replace(/\s+/g, '')}`);
}

