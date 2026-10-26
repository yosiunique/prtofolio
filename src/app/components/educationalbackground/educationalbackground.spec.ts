import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Educationalbackground } from './educationalbackground';

describe('Educationalbackground', () => {
  let component: Educationalbackground;
  let fixture: ComponentFixture<Educationalbackground>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Educationalbackground],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Educationalbackground);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
