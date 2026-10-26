import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AdminProjects } from './projects';

describe('AdminProjects', () => {
  let component: AdminProjects;
  let fixture: ComponentFixture<AdminProjects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProjects],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProjects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list project entries', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.crud-row').length).toBe(
      component.items().length,
    );
  });
});
