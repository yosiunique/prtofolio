import { Component, computed, inject } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { SiteAssetsService } from '../../services/site-assets.service';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  private readonly portfolio = inject(PortfolioService);
  private readonly assets = inject(SiteAssetsService);

  /** About content is dynamic — served from mock data today, API later. */
  readonly profile = this.portfolio.profile;
  /** Live profile photo — updates whenever it changes from the admin area. */
  readonly photo = this.assets.profilePhoto;

  /** Recomputed automatically whenever the admin edits the profile. */
  readonly quickFacts = computed<{ label: string; value: string }[]>(() => [
    { label: 'Role', value: this.profile().role },
    { label: 'Company', value: this.profile().company },
    { label: 'Experience', value: this.profile().yearsOfExperience },
    { label: 'Location', value: this.profile().location },
  ]);
}

