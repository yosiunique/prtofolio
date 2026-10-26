import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AdminImages } from './images';

describe('AdminImages', () => {
  let component: AdminImages;
  let fixture: ComponentFixture<AdminImages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminImages],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminImages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
