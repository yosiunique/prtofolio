import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Experiance } from './experiance';

describe('Experiance', () => {
  let component: Experiance;
  let fixture: ComponentFixture<Experiance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Experiance],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Experiance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
