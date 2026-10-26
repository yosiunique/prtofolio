import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { PublicLayout } from './public-layout';

describe('PublicLayout', () => {
  let component: PublicLayout;
  let fixture: ComponentFixture<PublicLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicLayout],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the professional public shell: header, main, footer and chat', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.site-header')).toBeTruthy();
    expect(compiled.querySelector('main#main-content')).toBeTruthy();
    expect(compiled.querySelector('footer.footer')).toBeTruthy();
    expect(compiled.querySelector('app-chat-widget')).toBeTruthy();
    expect(compiled.querySelector('.skip-link')).toBeTruthy();
  });

  it('renders ONLY public navigation — no administration links leak to the site', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const navText = compiled.querySelector('.primary-nav')?.textContent ?? '';
    for (const label of ['Home', 'About', 'Skills', 'Education', 'Experience', 'Projects', 'Contact']) {
      expect(navText).toContain(label);
    }
    // No CMS entries in the public header.
    expect(navText).not.toContain('Dashboard');
    expect(navText).not.toContain('Administration');
    expect(navText).not.toContain('Images');
    expect(navText).not.toContain('Messages');
    expect(compiled.querySelector('.nav-section--admin')).toBeNull();
  });
});
