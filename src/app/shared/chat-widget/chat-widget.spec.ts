import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ChatWidget } from './chat-widget';

describe('ChatWidget', () => {
  let component: ChatWidget;
  let fixture: ComponentFixture<ChatWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatWidget],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
