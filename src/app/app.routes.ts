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
        redirectTo: 'inicio',
      },
      {
        path: 'inicio',
        loadComponent: () => import('./inicio/inicio.component'),
      },
      {
        path: 'login',
        loadComponent: () => import('./login/login.component'),
      },
    ],
  },
];
