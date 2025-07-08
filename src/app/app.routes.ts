import { Routes } from '@angular/router';
import { About } from './components/about/about';
import { Skills } from './components/skills/skills';
import { Projects } from './components/projects/projects';
import { Experiance } from './components/experiance/experiance';
import { Contacts } from './components/contacts/contacts';
import { Hero } from './components/hero/hero';
import { Educationalbackground } from './components/educationalbackground/educationalbackground';

export const routes: Routes = [
  { path: '', component:Hero },
  { path: 'about', component: About },
  { path: 'skills', component: Skills },
  { path: 'projects', component: Projects },
  { path: 'experience', component: Experiance},
  { path: 'contact', component: Contacts},
  {path:'ebackground', component:Educationalbackground}
];
