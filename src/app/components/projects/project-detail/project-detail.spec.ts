import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { ProjectDetail } from './project-detail';

describe('ProjectDetail', () => {
  const setupWithSlug = (slug: string): void => {
    TestBed.configureTestingModule({
      imports: [ProjectDetail],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ slug })) } },
      ],
    });
  };

  it('renders the full case study for a known slug', () => {
    setupWithSlug('school-payments');
    const fixture = TestBed.createComponent(ProjectDetail);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(component.project()?.name).toBe('School Payments');
    expect(el.textContent).toContain('Problem');
    expect(el.textContent).toContain('Solution');
    expect(el.textContent).toContain('My contribution');
    expect(el.textContent).toContain('Key features');
    expect(el.textContent).toContain('Architecture');
    expect(el.textContent).toContain('Result');
    expect(el.textContent).toContain('Full-Stack Software Engineer');
    // Sanitized case study shows the confidentiality badge + notice
    expect(el.querySelector('.case-badge--sanitized')).toBeTruthy();
    expect(el.textContent).toContain('intentionally withheld');
  });

  it('never renders internalNotes (private admin-only data)', () => {
    setupWithSlug('school-payments');
    const fixture = TestBed.createComponent(ProjectDetail);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).not.toContain('internal wiki');
    expect(el.textContent).not.toContain('Internal:');
  });

  it('shows the empty state for an unknown slug', () => {
    setupWithSlug('does-not-exist');
    const fixture = TestBed.createComponent(ProjectDetail);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(component.project()).toBeUndefined();
    expect(el.textContent).toContain('Project not found');
    expect(el.textContent).toContain('Back to projects');
  });
});
