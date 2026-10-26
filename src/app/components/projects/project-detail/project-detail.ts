import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { PortfolioService } from '../../../services/portfolio.service';

/**
 * Project case study (/projects/:slug) — a professional engineering
 * write-up: problem, solution, contribution, features, architecture,
 * challenges and results.
 *
 * CONFIDENTIALITY: only public/sanitized fields are rendered here.
 * `internalNotes` (private data, internal URLs, credentials) is never
 * read by this component — it exists for the admin only.
 */
@Component({
  selector: 'app-project-detail',
  imports: [RouterModule],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss',
})
export class ProjectDetail {
  private readonly portfolio = inject(PortfolioService);
  private readonly route = inject(ActivatedRoute);

  /** Current /projects/:slug value — updates reactively on navigation. */
  private readonly slug = toSignal(this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')), {
    initialValue: '',
  });

  /** Resolved project — undefined renders the not-found/empty state. */
  readonly project = computed(() => {
    const slug = this.slug();
    return slug ? this.portfolio.projectBySlug(slug) : undefined;
  });

  /** Small ordered helpers so the template can render sections conditionally. */
  has(value: unknown): boolean {
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value !== null && value !== undefined && String(value).trim() !== '';
  }
}
