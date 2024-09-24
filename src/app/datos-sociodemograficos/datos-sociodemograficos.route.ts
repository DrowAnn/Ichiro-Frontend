import { Route } from '@angular/router';
import DatosSociodemograficosComponent from './datos-sociodemograficos.component';

export const routes: Route[] = [
  {
    path: '',
    component: DatosSociodemograficosComponent,
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
          import('./perfil-sociodemografico/perfil-sociodemografico.component'),
      },
    ],
  },
];
