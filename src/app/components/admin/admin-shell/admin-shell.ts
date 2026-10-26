import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChatService } from '../../../services/chat.service';

/** Tab model for the administration sub-navigation. */
interface AdminTab {
  label: string;
  path: string;
  showBadge?: boolean;
}

/**
 * Layout shell for the administration area — renders the CMS header and
 * section navigation around the routed admin pages (dashboard / CRUD /
 * images / messages). Completely separate from the public portfolio layout.
 */
@Component({
  selector: 'app-admin-shell',
  imports: [RouterModule],
  templateUrl: './admin-shell.html',
  styleUrl: './admin-shell.scss',
})
export class AdminShell {
  private readonly chat = inject(ChatService);

  readonly tabs: AdminTab[] = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'About Me', path: '/admin/about' },
    { label: 'Experience', path: '/admin/experience' },
    { label: 'Projects', path: '/admin/projects' },
    { label: 'Education', path: '/admin/education' },
    { label: 'Contact', path: '/admin/contact' },
    { label: 'Images', path: '/admin/images' },
    { label: 'Messages', path: '/admin/messages', showBadge: true },
  ];

  /** Live unread count shown on the Messages tab. */
  readonly unread = this.chat.unreadCount;
}
