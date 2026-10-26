import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AdminMessages } from './messages';

describe('AdminMessages', () => {
  let component: AdminMessages;
  let fixture: ComponentFixture<AdminMessages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMessages],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMessages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
