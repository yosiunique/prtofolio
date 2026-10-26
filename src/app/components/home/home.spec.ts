import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the experience and project block headers', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Step 01 block header.
    expect(compiled.querySelector('.block-step')?.textContent).toContain('01');

    // Step 02 block header.
    const blockSteps = compiled.querySelectorAll('.block-step');
    expect(blockSteps.length).toBe(2);
    expect(blockSteps[1]?.textContent).toContain('02');
  });

  it('shows exactly one carousel slide at a time with a dot per item', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // One visible slide per section …
    expect(compiled.querySelectorAll('.showcase--experience .step-card').length).toBe(1);
    expect(compiled.querySelectorAll('.showcase--projects .proj-card').length).toBe(1);

    // … a control row per section …
    expect(compiled.querySelectorAll('.showcase-controls').length).toBe(2);

    // … and one dot per experience / project so any slide can be reached.
    expect(compiled.querySelectorAll('.showcase-dots .showcase-dot').length).toBe(
      component.experiences().length + component.projects().length,
    );
    expect(compiled.querySelector('.tech-chip')).toBeTruthy();
  });

  it('advances the experience carousel and wraps around at both ends', () => {
    const total = component.experiences().length;
    expect(total).toBeGreaterThan(1);
    expect(component.experienceIndex()).toBe(0);

    component.nextExperience();
    expect(component.experienceIndex()).toBe(1);

    // Jump to the last slide, then wrap forward to the first.
    component.selectExperience(total - 1);
    component.nextExperience();
    expect(component.experienceIndex()).toBe(0);

    // Wrap backwards from the first slide to the last.
    component.previousExperience();
    expect(component.experienceIndex()).toBe(total - 1);
  });

  it('advances the project carousel and shows the selected project', () => {
    const total = component.projects().length;
    expect(total).toBeGreaterThan(1);

    component.nextProject();
    fixture.detectChanges();
    expect(component.projectIndex()).toBe(1);

    const selected = component.projects()[1];
    expect(selected).toBeDefined();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.showcase--projects h3')?.textContent).toContain(
      selected!.name,
    );

    // Wraps from the last project back to the first.
    component.selectProject(total - 1);
    component.nextProject();
    expect(component.projectIndex()).toBe(0);
  });

  it('pauses and resumes the carousels without breaking the slide', () => {
    component.pauseExperienceRotation();
    component.resumeExperienceRotation();
    component.pauseProjectRotation();
    component.resumeProjectRotation();

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.showcase--experience .step-card').length).toBe(1);
    expect(compiled.querySelectorAll('.showcase--projects .proj-card').length).toBe(1);
  });

  it('exposes a dark-mode toggle that flips the html.dark class', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const toggle = compiled.querySelector<HTMLButtonElement>('.theme-toggle');
    expect(toggle).toBeTruthy();

    const before = component.isDark();
    component.toggleDarkMode();
    fixture.detectChanges();

    expect(component.isDark()).toBe(!before);
    expect(document.documentElement.classList.contains('dark')).toBe(!before);
    expect(toggle!.getAttribute('aria-pressed')).toBe(String(!before));

    // Toggle back so later tests start from a clean state.
    component.toggleDarkMode();
    fixture.detectChanges();
    expect(component.isDark()).toBe(before);
  });

  it('renders inline SVG icons in the hero instead of emoji', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heroText = compiled.querySelector('.hero-text')?.textContent ?? '';

    // No pictographic emoji anywhere in the hero (parity with the contact guard).
    expect(heroText).not.toMatch(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u);

    // Location + company meta icons and the theme-toggle icons are real SVGs.
    expect(compiled.querySelectorAll('.meta-icon svg').length).toBe(2);
    expect(compiled.querySelectorAll('.theme-toggle svg').length).toBe(2);
  });
});
