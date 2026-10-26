import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../../services/chat.service';
import { ChatMessage } from '../../../models/portfolio.models';

/**
 * Admin inbox — reads the visitor conversation and sends replies.
 * Messages are persisted via ChatService (localStorage mock DB today,
 * HTTP/DB when the backend is connected).
 */
@Component({
  selector: 'app-admin-messages',
  imports: [FormsModule, DatePipe],
  templateUrl: './messages.html',
  styleUrl: './messages.scss',
})
export class AdminMessages {
  private readonly chat = inject(ChatService);

  readonly messages = this.chat.messages;
  readonly unreadCount = this.chat.unreadCount;
  readonly status = signal('');

  replyDraft = '';

  isVisitor(message: ChatMessage): boolean {
    return message.author === 'visitor';
  }

  sendReply(): void {
    const text = this.replyDraft.trim();
    if (!text) {
      return;
    }
    this.chat.sendOwnerReply(text);
    this.replyDraft = '';
    this.status.set('Reply sent to the conversation.');
  }

  markAllRead(): void {
    this.chat.markAllRead();
    this.status.set('All messages marked as read.');
  }

  clearAll(): void {
    this.chat.clearAll();
    this.status.set('Conversation cleared.');
  }
}
