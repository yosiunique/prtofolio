import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AdminAbout } from './about';

describe('AdminAbout', () => {
  let component: AdminAbout;
  let fixture: ComponentFixture<AdminAbout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAbout],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAbout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
