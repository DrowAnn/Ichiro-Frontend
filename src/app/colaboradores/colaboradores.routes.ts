import { Route } from '@angular/router';
import ColaboradoresComponent from './colaboradores.component';

export const routes: Route[] = [
  {
    path: '',
    component: ColaboradoresComponent,
    children: [
      {
        path: 'listado',
        loadComponent: () => import('./listado/listado.component'),
      },
    ],
  },
];
