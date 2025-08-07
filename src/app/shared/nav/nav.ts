import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-nav',
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './nav.html',
  styleUrl: './nav.scss'
})
export class Nav {
// nav.component.ts

  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
