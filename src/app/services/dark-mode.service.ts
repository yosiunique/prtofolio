import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

/** Central dark-mode control — one source of truth for the whole application.
 *
 * The turnable state is stored in `localStorage` and, on first load,
 * defaults to the visitor's system preference (`prefers-color-scheme: dark`).
 * Every token-based component follows automatically by toggling the
 * `dark` class on `<html>`. Components that need to act on the change can
 * inject this service instead of rolling their own.
 */
@Injectable({ providedIn: 'root' })
export class DarkModeService {
  private readonly platformId = inject(PLATFORM_ID);

  private readonly storageKey = 'yg_dark_mode';

  /** Current dark-mode state. */
  private readonly dark = signal<boolean>(this.loadPreference());

  /** Read-only view of `dark` — safe for templates to subscribe to. */
  readonly isDark = this.dark.asReadonly();

  /** Toggle between light and dark presentation. */
  toggle(): void {
    this.dark.update((current) => !current);
    this.apply();
  }

  /** Apply the stored preference (no-op on the server during SSR). */
  init(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.apply();
  }

  private loadPreference(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored !== null) {
        return stored === 'true';
      }
    } catch {
      // Storage unavailable (private mode) — fall back to system preference.
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private apply(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const root = document.documentElement;
    root.classList.toggle('dark', this.dark());
    root.style.colorScheme = this.dark() ? 'dark' : 'light';

    try {
      localStorage.setItem(this.storageKey, String(this.dark()));
    } catch {
      // Ignore write failures.
    }
  }
}
