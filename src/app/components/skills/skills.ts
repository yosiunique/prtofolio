import { Component, inject } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  private readonly portfolio = inject(PortfolioService);

  /** Skill groups are dynamic — served from mock data today, API later. */
  readonly skillGroups = this.portfolio.skillGroups;
}

