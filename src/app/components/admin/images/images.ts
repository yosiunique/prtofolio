import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SiteAssetsService } from '../../../services/site-assets.service';

/**
 * Admin image manager — upload images, choose the profile photo,
 * and maintain the portfolio gallery.
 */
@Component({
  selector: 'app-admin-images',
  imports: [FormsModule, DatePipe],
  templateUrl: './images.html',
  styleUrl: './images.scss',
})
export class AdminImages {
  private readonly assets = inject(SiteAssetsService);

  readonly profilePhoto = this.assets.profilePhoto;
  readonly gallery = this.assets.gallery;
  readonly defaultPhotoUrl = this.assets.defaultPhotoUrl;

  /** Checkbox state: apply the next upload as the profile photo too. */
  readonly setAsProfileAfterUpload = signal(true);
  /** Status line after an upload / reset action. */
  readonly status = signal('');

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      this.status.set('Please choose an image file (PNG, JPG, WEBP, SVG…).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.assets.addImage(
        file.name,
        String(reader.result),
        this.setAsProfileAfterUpload(),
      );
      this.status.set(
        this.setAsProfileAfterUpload()
          ? `"${file.name}" uploaded and set as your profile photo.`
          : `"${file.name}" added to the gallery.`,
      );
      input.value = '';
    };
    reader.onerror = () => this.status.set('Could not read that file — please try again.');
    reader.readAsDataURL(file);
  }

  useAsProfile(url: string): void {
    this.assets.setProfilePhoto(url);
    this.status.set('Profile photo updated — visible across the whole site.');
  }

  removeImage(id: string): void {
    this.assets.removeImage(id);
    this.status.set('Image removed from the gallery.');
  }

  resetProfile(): void {
    this.assets.resetProfilePhoto();
    this.status.set('Profile photo reset to the default image.');
  }
}
