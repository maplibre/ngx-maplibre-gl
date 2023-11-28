import { Routes } from '@angular/router';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home-index.component').then((m) => m.HomeIndexComponent),
    pathMatch: 'full',
  },
];
