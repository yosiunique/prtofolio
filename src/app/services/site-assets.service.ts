import { isPlatformBrowser } from '@angular/common';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { GalleryImage } from '../models/portfolio.models';
import { PortfolioService } from './portfolio.service';

const PROFILE_PHOTO_KEY = 'yg_profile_photo';
const GALLERY_KEY = 'yg_gallery';

/**
 * Manages the site's imagery (profile photo + admin-uploaded gallery).
 *
 * Today this persists to `localStorage` as a mock database so the admin area
 * is fully functional offline. When the backend is ready, replace the
 * load/persist calls with HTTP endpoints (e.g. `GET/POST /api/images`) —
 * the exposed signals and methods stay exactly the same, so no component
 * template needs to change.
 */
@Injectable({ providedIn: 'root' })
export class SiteAssetsService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly portfolio = inject(PortfolioService);

  /** The bundled default photo, used until the admin uploads a custom one. */
  readonly defaultPhotoUrl = this.portfolio.profile().photo;

  /** Live profile photo — updating it refreshes every page that shows it. */
  readonly profilePhoto = signal<string>(
    this.read<string>(PROFILE_PHOTO_KEY) ?? this.defaultPhotoUrl,
  );

  /** All images uploaded from the admin area. */
  readonly gallery = signal<GalleryImage[]>(this.read<GalleryImage[]>(GALLERY_KEY) ?? []);

  readonly imageCount = computed(() => this.gallery().length);

  setProfilePhoto(url: string): void {
    this.profilePhoto.set(url);
    this.write(PROFILE_PHOTO_KEY, url);
  }

  /** Adds an uploaded image to the gallery and optionally makes it the profile photo. */
  addImage(name: string, dataUrl: string, setAsProfile = false): void {
    const image: GalleryImage = {
      id: this.createId(),
      name,
      url: dataUrl,
      addedAt: new Date().toISOString(),
    };
    this.gallery.update((images) => [image, ...images]);
    this.write(GALLERY_KEY, this.gallery());
    if (setAsProfile) {
      this.setProfilePhoto(dataUrl);
    }
  }

  removeImage(id: string): void {
    this.gallery.update((images) => images.filter((image) => image.id !== id));
    this.write(GALLERY_KEY, this.gallery());
  }

  /** Restores the bundled default photo and clears the stored override. */
  resetProfilePhoto(): void {
    this.profilePhoto.set(this.defaultPhotoUrl);
    this.remove(PROFILE_PHOTO_KEY);
  }

  private createId(): string {
    return typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `img-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
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

  private remove(key: string): void {
    if (this.isBrowser) {
      localStorage.removeItem(key);
    }
  }
}
