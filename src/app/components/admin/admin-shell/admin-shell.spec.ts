import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AdminShell } from './admin-shell';

describe('AdminShell', () => {
  let component: AdminShell;
  let fixture: ComponentFixture<AdminShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminShell],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminShell);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
