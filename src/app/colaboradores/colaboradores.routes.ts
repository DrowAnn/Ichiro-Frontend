import { Route } from '@angular/router';
import ColaboradoresComponent from './colaboradores.component';

export const routes: Route[] = [
  {
    path: '',
    component: ColaboradoresComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'listado',
      },
      {
        path: 'listado',
        loadComponent: () => import('./listado/listado.component'),
      },
      {
        path: ':numeroIdentificacion',
        loadComponent: () =>
          import('./datos-personales/datos-personales.component'),
      },
    ],
  },
];
