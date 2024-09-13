import { Route } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Route[] = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'Inicio',
      },
      {
        path: 'inicio',
        loadComponent: () => import('./inicio/inicio.component'),
      },
    ],
  },
];
