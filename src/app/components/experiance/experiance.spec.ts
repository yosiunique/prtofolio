import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Experiance } from './experiance';

describe('Experiance', () => {
  let component: Experiance;
  let fixture: ComponentFixture<Experiance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Experiance]
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
