import { Routes } from '@angular/router';
import { About } from './components/about/about';
import { Skills } from './components/skills/skills';
import { Projects } from './components/projects/projects';
import { Experiance } from './components/experiance/experiance';
import { Contacts } from './components/contacts/contacts';
import { Hero } from './components/hero/hero';
import { Educationalbackground } from './components/educationalbackground/educationalbackground';
import { Home } from './components/home/home';
import path from 'path';

export const routes: Routes = [
{ path:'',
  redirectTo:'home',
  pathMatch:'full'
},
{
  path:'home',
  loadComponent:()=>import('./components/home/home').then(m=>m.Home)
},
{  path:'protofolio',
  children:[
   {
    path:'about',
    loadComponent:()=>import('./components/about/about').then(m=>m.About)
   },
   {
    path:'skills',
    loadComponent:()=>import('./components/skills/skills').then(m=>m.Skills)
   },
   {
    path:'projects',
    loadComponent:()=>import('./components/projects/projects').then(m=>m.Projects)
   },
   {
    path:'experiance',
    loadComponent:()=>import('./components/experiance/experiance').then(m=>m.Experiance)
   },
   {path:'contacts',
    loadComponent:()=>import('./components/contacts/contacts').then(m=>m.Contacts)
   },
   {path:'educationalbackground',
    loadComponent:()=>import('./components/educationalbackground/educationalbackground').then(m=>m.Educationalbackground)
   },
   {path :'hero',
    loadComponent:()=>import('./components/hero/hero').then(m=>m.Hero)
   }

  ]
},

{
  path:'**',
  loadComponent:()=>import('./compponents/notfound/notfound').then(n=>n.Notfound)
}
,

];
