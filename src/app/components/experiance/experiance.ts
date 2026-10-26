import { Component, inject } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-experiance',
  imports: [],
  templateUrl: './experiance.html',
  styleUrl: './experiance.scss',
})
export class Experiance {
  private readonly portfolio = inject(PortfolioService);

  /** Experience timeline is dynamic — served from mock data today, API later. */
  readonly experiences = this.portfolio.experience;
}

