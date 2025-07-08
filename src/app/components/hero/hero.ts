import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'app-hero',
  imports: [
    RouterModule
  ],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero {

}
