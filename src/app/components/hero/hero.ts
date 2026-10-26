import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-hero',
  imports: [RouterModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  private readonly portfolio = inject(PortfolioService);

  /** Hero content is dynamic — served from mock data today, API later. */
  readonly profile = this.portfolio.profile;
  readonly techStack = this.portfolio.skillGroups.flatMap((group) => group.skills);
}

