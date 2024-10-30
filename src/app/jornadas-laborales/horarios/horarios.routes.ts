import { Route } from '@angular/router';
import HorariosComponent from './horarios.component';

export const routes: Route[] = [
  {
    path: '',
    component: HorariosComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'buscador',
      },
      {
        path: 'buscador',
        loadComponent: () =>
          import('./busqueda-horarios/busqueda-horarios.component'),
      },
      {
        path: 'formulario',
        loadComponent: () =>
          import('./formulario-horarios/formulario-horarios.component'),
      },
    ],
  },
];
