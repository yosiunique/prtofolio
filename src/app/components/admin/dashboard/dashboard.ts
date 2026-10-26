import { Component, computed, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PortfolioService } from '../../../services/portfolio.service';
import { SiteAssetsService } from '../../../services/site-assets.service';
import { ChatService } from '../../../services/chat.service';

/** Admin dashboard — quick stats and links over the live portfolio state. */
@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class AdminDashboard {
  private readonly chat = inject(ChatService);
  private readonly assets = inject(SiteAssetsService);
  private readonly portfolio = inject(PortfolioService);

  readonly unreadCount = this.chat.unreadCount;
  readonly totalMessages = this.chat.totalCount;
  readonly imageCount = this.assets.imageCount;
  readonly profilePhoto = this.assets.profilePhoto;
  readonly projectCount = computed(() => this.portfolio.projects().length);

  /** Two-step confirm state for "reset all content". */
  readonly pendingReset = signal(false);
  readonly status = signal('');

  confirmReset(): void {
    this.portfolio.resetContent();
    this.pendingReset.set(false);
    this.status.set('All content restored to the original defaults.');
  }
}
