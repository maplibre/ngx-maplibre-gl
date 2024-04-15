import { Routes } from '@angular/router';
import { DEMO_ROUTES } from './demo/routes';
import { HOME_ROUTES } from './home/routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shared/layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: 'demo',
        children: DEMO_ROUTES,
      },
      ...HOME_ROUTES
    ],
  },
  { path: '**', redirectTo: '' },
];
