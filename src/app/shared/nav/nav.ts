import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';
import { SiteAssetsService } from '../../services/site-assets.service';

/**
 * Public top navigation — a professional website header:
 * brand (logo / name) on the left, public links on the right, and a
 * hamburger dropdown on small screens.
 *
 * Administration links are intentionally NOT rendered here; the CMS has
 * its own shell under /admin.
 */
@Component({
  selector: 'app-nav',
  imports: [RouterModule],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
  host: { '(document:keydown.escape)': 'closeMenu()' },
})
export class Nav {
  private readonly portfolio = inject(PortfolioService);
  private readonly assets = inject(SiteAssetsService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  /** Brand + public links are dynamic — mock data today, API later. */
  readonly brand = this.portfolio.brand;
  readonly links = this.portfolio.nav.links;
  readonly socialLinks = this.portfolio.footer.socialLinks;
  readonly profileName = this.portfolio.profile;
  /** Live photo — updates whenever the admin uploads a new profile image. */
  readonly profilePhoto = this.assets.profilePhoto;

  isMenuOpen = false;

  toggleMenu(): void {
    this.setMenu(!this.isMenuOpen);
  }

  closeMenu(): void {
    this.setMenu(false);
  }

  isExternal(url: string): boolean {
    return /^https?:\/\//i.test(url);
  }

  constructor() {
    this.destroyRef.onDestroy(() => {
      if (isPlatformBrowser(this.platformId)) {
        document.body.style.overflow = '';
      }
    });
  }

  private setMenu(open: boolean): void {
    this.isMenuOpen = open;
    // Lock body scroll while the mobile menu is open.
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = open ? 'hidden' : '';
    }
  }
}
