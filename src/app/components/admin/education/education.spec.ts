import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AdminEducation } from './education';

describe('AdminEducation', () => {
  let component: AdminEducation;
  let fixture: ComponentFixture<AdminEducation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEducation],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEducation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
