import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';
import { SiteAssetsService } from '../../services/site-assets.service';
import { DarkModeService } from '../../services/dark-mode.service';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, OnDestroy {
  private readonly portfolio = inject(PortfolioService);
  private readonly assets = inject(SiteAssetsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly darkMode = inject(DarkModeService);

  /** Hero content is dynamic — served from mock data today, API later. */
  readonly profile = this.portfolio.profile;
  /** Live profile photo — updates whenever it changes from the admin area. */
  readonly photo = this.assets.profilePhoto;
  readonly projectCount = computed(() => this.portfolio.projects().length);
  readonly skillCount = this.portfolio.skillGroups.flatMap((group) => group.skills).length;

  /** Experience + projects shown on the home page — same data as their pages. */
  readonly experiences = this.portfolio.experience;
  readonly projects = this.portfolio.projects;

  /** Whether dark mode is currently active. */
  readonly isDark = this.darkMode.isDark;

  /** Toggle light/dark presentation. */
  toggleDarkMode(): void {
    this.darkMode.toggle();
  }

  /** Formats a zero-based index as a two-digit step label (01, 02, …). */
  stepLabel(index: number): string {
    return (index + 1).toString().padStart(2, '0');
  }

  readonly displayedNote = signal(this.profile().highlights[0]);

  // --- Auto-rotating carousels : Experience (01) and Projects (02) ---

  /** How long each slide stays on screen before changing (ms). */
  private readonly carouselIntervalMs = 4500;

  readonly experienceIndex = signal(0);
  readonly projectIndex = signal(0);

  /**
   * Single-item slide wrappers. The @for in the template tracks by `id`, so
   * every index change re-creates the node and the CSS entrance animation
   * replays automatically.
   */
  readonly experienceSlide = computed(() => {
    const list = this.experiences();
    if (!list.length) {
      return [];
    }
    return [list[this.experienceIndex()] ?? list[0]];
  });

  readonly projectSlide = computed(() => {
    const list = this.projects();
    if (!list.length) {
      return [];
    }
    return [list[this.projectIndex()] ?? list[0]];
  });

  nextExperience(): void {
    this.experienceIndex.update((i) => this.wrapIndex(i + 1, this.experiences().length));
  }

  previousExperience(): void {
    this.experienceIndex.update((i) => this.wrapIndex(i - 1, this.experiences().length));
  }

  selectExperience(index: number): void {
    this.experienceIndex.set(index);
  }

  nextProject(): void {
    this.projectIndex.update((i) => this.wrapIndex(i + 1, this.projects().length));
  }

  previousProject(): void {
    this.projectIndex.update((i) => this.wrapIndex(i - 1, this.projects().length));
  }

  selectProject(index: number): void {
    this.projectIndex.set(index);
  }

  /** Auto-rotation pauses while the user hovers or tabs into a section. */
  pauseExperienceRotation(): void {
    this.clearTimer('experience');
  }

  resumeExperienceRotation(): void {
    this.startExperienceRotation();
  }

  pauseProjectRotation(): void {
    this.clearTimer('project');
  }

  resumeProjectRotation(): void {
    this.startProjectRotation();
  }

  private noteIndex = 0;
  private rotationTimer?: ReturnType<typeof setInterval>;
  private experienceTimer?: ReturnType<typeof setInterval>;
  private projectTimer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    // Rotating highlights are a browser-only concern — skip on the server (SSR).
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.darkMode.init();
    this.rotationTimer = setInterval(() => this.rotateNote(), 5000);
    this.startExperienceRotation();
    this.startProjectRotation();
    this.destroyRef.onDestroy(() => this.stopAllRotations());
  }

  ngOnDestroy(): void {
    this.stopAllRotations();
  }

  private rotateNote(): void {
    const highlights = this.profile().highlights;
    this.noteIndex = (this.noteIndex + 1) % highlights.length;
    this.displayedNote.set(highlights[this.noteIndex]);
  }

  private startExperienceRotation(): void {
    this.clearTimer('experience');
    this.experienceTimer = setInterval(() => this.nextExperience(), this.carouselIntervalMs);
  }

  private startProjectRotation(): void {
    this.clearTimer('project');
    this.projectTimer = setInterval(() => this.nextProject(), this.carouselIntervalMs);
  }

  private clearTimer(which: 'experience' | 'project'): void {
    const timer = which === 'experience' ? this.experienceTimer : this.projectTimer;
    if (timer !== undefined) {
      clearInterval(timer);
      if (which === 'experience') {
        this.experienceTimer = undefined;
      } else {
        this.projectTimer = undefined;
      }
    }
  }

  private stopAllRotations(): void {
    if (this.rotationTimer !== undefined) {
      clearInterval(this.rotationTimer);
      this.rotationTimer = undefined;
    }
    this.clearTimer('experience');
    this.clearTimer('project');
  }

  /** Positive modulo so the carousel wraps first ↔ last in both directions. */
  private wrapIndex(index: number, length: number): number {
    if (length <= 0) {
      return 0;
    }
    return ((index % length) + length) % length;
  }
}
