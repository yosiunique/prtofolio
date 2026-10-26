import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AdminExperience } from './experience';

describe('AdminExperience', () => {
  let component: AdminExperience;
  let fixture: ComponentFixture<AdminExperience>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminExperience],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminExperience);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list experience entries', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.crud-row').length).toBe(
      component.items().length,
    );
  });
});
