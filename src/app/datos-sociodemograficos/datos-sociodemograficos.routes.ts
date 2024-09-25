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
        redirectTo: 'lista',
      },
      {
        path: 'lista',
        loadComponent: () => import('./lista/lista.component'),
      },
      {
        path: ':numeroIdentificacion',
        loadComponent: () =>
          import('./perfil-sociodemografico/perfil-sociodemografico.component'),
      },
    ],
  },
];
