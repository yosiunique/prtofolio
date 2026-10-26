import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';

/**
 * Projects index — presents each project as a case-study teaser
 * (type, role, stack) linking to its full /projects/:slug write-up.
 */
@Component({
  selector: 'app-projects',
  imports: [RouterModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  private readonly portfolio = inject(PortfolioService);

  /** Projects are dynamic — served from mock data today, API later. */
  readonly projects = this.portfolio.projects;

  /** Public URL segment of a project's case-study page. */
  slugOf = this.portfolio.slugOf.bind(this.portfolio);
}

