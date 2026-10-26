import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-footer',
  imports: [RouterModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  private readonly portfolio = inject(PortfolioService);

  /** Footer content is dynamic — served from mock data today, API later. */
  readonly currentYear = new Date().getFullYear();
  readonly brand = this.portfolio.brand;
  readonly tagline = this.portfolio.footer.tagline;
  readonly quickLinks = this.portfolio.footer.quickLinks;
  readonly socialLinks = this.portfolio.footer.socialLinks;
  readonly rights = this.portfolio.footer.rights;

  isExternal(url: string): boolean {
    return /^https?:\/\//i.test(url);
  }

  scrollToTop(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}

