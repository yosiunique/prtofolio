import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Nav } from './nav';

describe('Nav', () => {
  let component: Nav;
  let fixture: ComponentFixture<Nav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nav],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Nav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders a top header with the brand and the public links only', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.site-header')).toBeTruthy();
    expect(compiled.querySelector('.brand')?.textContent).toContain('Yoseph Getachew');

    const links = [...compiled.querySelectorAll('.nav-link')].map((a) => a.textContent?.trim());
    expect(links).toEqual([
      'Home',
      'About',
      'Skills',
      'Education',
      'Experience',
      'Projects',
      'Contact',
    ]);
  });

  it('never renders administration links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navText = compiled.querySelector('.site-header')?.textContent ?? '';

    expect(navText).not.toContain('Dashboard');
    expect(navText).not.toContain('Administration');
    expect(navText).not.toContain('/admin');
    expect(compiled.querySelector('.nav-section--admin')).toBeNull();
  });

  it('toggles the mobile menu', () => {
    expect(component.isMenuOpen).toBeFalse();
    component.toggleMenu();
    expect(component.isMenuOpen).toBeTrue();
    component.closeMenu();
    expect(component.isMenuOpen).toBeFalse();
  });
});

