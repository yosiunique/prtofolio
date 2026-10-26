import { isPlatformBrowser } from '@angular/common';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { ChatMessage } from '../models/portfolio.models';

const MESSAGES_KEY = 'yg_chat_messages';
const VISITOR_NAME_KEY = 'yg_chat_visitor_name';

const OWNER_NAME = 'Yoseph';

/**
 * Sample thread so the admin inbox demonstrates the workflow out of the box.
 * TODO: remove the seed once messages are fetched from the real database.
 */
const SEED_MESSAGES: ChatMessage[] = [
  {
    id: 'seed-1',
    author: 'visitor',
    name: 'Samuel T.',
    text: 'Hi Yoseph! I reviewed your SMS service API project — impressive work. Are you open to freelance collaboration?',
    sentAt: '2026-09-28T09:30:00.000Z',
    read: true,
  },
  {
    id: 'seed-2',
    author: 'me',
    name: OWNER_NAME,
    text: 'Hi Samuel, thanks for reaching out! Yes — send over the project details and let’s schedule a call.',
    sentAt: '2026-09-28T10:05:00.000Z',
    read: true,
  },
];

/**
 * Messaging backbone for the portfolio chat.
 *
 * Visitors send messages from the floating chat widget; the owner reads and
 * replies from the admin Messages page. Messages persist to `localStorage`
 * as a mock database — when the real backend is ready, replace the
 * load/persist calls with HTTP endpoints (e.g. `GET/POST /api/messages`)
 * and keep the public API of this service unchanged.
 */
@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  /** Full conversation thread, oldest first. */
  readonly messages = signal<ChatMessage[]>(this.read<ChatMessage[]>(MESSAGES_KEY) ?? SEED_MESSAGES);

  /** Visitor messages the owner has not opened yet — drives the sidebar badge. */
  readonly unreadCount = computed(
    () => this.messages().filter((m) => m.author === 'visitor' && !m.read).length,
  );

  readonly totalCount = computed(() => this.messages().length);

  /** Called from the public chat widget. */
  sendVisitorMessage(name: string, text: string): void {
    const trimmedName = name.trim() || 'Visitor';
    this.append({
      id: this.createId(),
      author: 'visitor',
      name: trimmedName,
      text: text.trim(),
      sentAt: new Date().toISOString(),
      read: false,
    });
    this.saveVisitorName(trimmedName);
  }

  /** Called from the admin Messages page to reply to the visitor. */
  sendOwnerReply(text: string): void {
    this.append({
      id: this.createId(),
      author: 'me',
      name: OWNER_NAME,
      text: text.trim(),
      sentAt: new Date().toISOString(),
      read: true,
    });
  }

  markAllRead(): void {
    this.messages.update((messages) => messages.map((m) => ({ ...m, read: true })));
    this.write(MESSAGES_KEY, this.messages());
  }

  clearAll(): void {
    this.messages.set([]);
    this.write(MESSAGES_KEY, []);
  }

  savedVisitorName(): string {
    return this.read<string>(VISITOR_NAME_KEY) ?? '';
  }

  private saveVisitorName(name: string): void {
    this.write(VISITOR_NAME_KEY, name);
  }

  private append(message: ChatMessage): void {
    this.messages.update((messages) => [...messages, message]);
    this.write(MESSAGES_KEY, this.messages());
  }

  private createId(): string {
    return typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }

  // --- Mock persistence layer (swap for HTTP when the API is ready) ---

  private read<T>(key: string): T | null {
    if (!this.isBrowser) {
      return null;
    }
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  }

  private write(key: string, value: unknown): void {
    if (!this.isBrowser) {
      return;
    }
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage full or unavailable (private mode) — state still works in memory.
    }
  }
}
