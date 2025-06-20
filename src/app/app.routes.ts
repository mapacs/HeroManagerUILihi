import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'heroes',
    loadComponent: () =>
      import('./components/heroes/heros/heroes.component').then(
        (m) => m.HeroesComponent
      ),
  },
  { path: '', redirectTo: 'heroes', pathMatch: 'full' },
];
