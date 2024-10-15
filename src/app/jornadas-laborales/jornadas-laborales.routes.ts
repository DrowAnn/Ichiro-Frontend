import { Route } from '@angular/router';
import JornadasLaboralesComponent from './jornadas-laborales.component';

export const routes: Route[] = [
  {
    path: '',
    component: JornadasLaboralesComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'modulos',
      },
      {
        path: 'modulos',
        loadComponent: () => import('./modulos/modulos.component'),
      },
      {
        path: 'horarios',
        loadChildren: () =>
          import('./horarios/horarios.routes').then((m) => m.routes),
      },
      {
        path: 'auditorias-horarios',
        loadComponent: () =>
          import('./auditorias-horarios/auditoria-horarios.component'),
      },
      {
        path: 'liquidaciones-horas',
        loadComponent: () =>
          import('./liquidaciones-horas/liquidaciones-horas.component'),
      },
    ],
  },
];
