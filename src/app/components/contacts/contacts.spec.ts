import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Contacts } from './contacts';

describe('Contacts', () => {
  let component: Contacts;
  let fixture: ComponentFixture<Contacts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contacts],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Contacts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders channels, socials and the CTA from the dynamic contact content', () => {
    const el = fixture.nativeElement as HTMLElement;

    expect(el.textContent).toContain('Start a Conversation');
    // dynamic channels with proper deep links
    expect(el.querySelector('a[href^="mailto:"]')).toBeTruthy();
    expect(el.querySelector('a[href^="tel:"]')).toBeTruthy();
    expect(el.textContent).toContain('GitHub');
    expect(el.textContent).toContain('LinkedIn');
    // primary CTA panel
    expect(el.querySelector('.contact-cta .cta-button')).toBeTruthy();
    // availability status with its dot
    expect(el.querySelector('.status-dot')).toBeTruthy();
  });

  it('uses SVG icons instead of emoji', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('svg').length).toBeGreaterThanOrEqual(3);
    // §2/§10 : no emoji-based UI on the public pages
    expect(el.textContent ?? '').not.toMatch(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u);
  });
});
