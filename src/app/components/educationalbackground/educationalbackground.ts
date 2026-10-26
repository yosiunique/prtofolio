import { Component, inject } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-educationalbackground',
  imports: [],
  templateUrl: './educationalbackground.html',
  styleUrl: './educationalbackground.scss',
})
export class Educationalbackground {
  private readonly portfolio = inject(PortfolioService);

  /** Education history is dynamic — served from mock data today, API later. */
  readonly education = this.portfolio.education;
}

