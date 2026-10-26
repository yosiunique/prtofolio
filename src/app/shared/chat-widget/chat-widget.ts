import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';
import { ChatService } from '../../services/chat.service';

/**
 * Floating chat widget shown on the public pages so visitors can message
 * the site owner while browsing. Hidden on the /admin routes (the owner
 * replies from the admin Messages inbox instead).
 *
 * Messages are persisted through ChatService — swap the localStorage mock
 * for a real API/WebSocket later without changing this template.
 */
@Component({
  selector: 'app-chat-widget',
  imports: [FormsModule, DatePipe, RouterModule],
  templateUrl: './chat-widget.html',
  styleUrl: './chat-widget.scss',
})
export class ChatWidget {
  private readonly chat = inject(ChatService);
  private readonly router = inject(Router);

  readonly messages = this.chat.messages;
  readonly isOpen = signal(false);
  /** Hide the widget while the owner is browsing the admin area. */
  readonly isAdminRoute = signal(this.router.url.startsWith('/admin'));

  visitorName = this.chat.savedVisitorName();
  draft = '';

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((event) => {
        this.isAdminRoute.set(event.urlAfterRedirects.startsWith('/admin'));
        // Close the panel whenever navigation happens.
        this.isOpen.set(false);
      });
  }

  toggle(): void {
    this.isOpen.update((open) => !open);
  }

  close(): void {
    this.isOpen.set(false);
  }

  send(): void {
    const text = this.draft.trim();
    if (!text) {
      return;
    }
    this.chat.sendVisitorMessage(this.visitorName, text);
    this.draft = '';
  }

  isOwnMessage(author: string): boolean {
    return author === 'visitor';
  }
}
