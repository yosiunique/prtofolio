import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AdminContact } from './contact';

describe('AdminContact', () => {
  let component: AdminContact;
  let fixture: ComponentFixture<AdminContact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminContact],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminContact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
