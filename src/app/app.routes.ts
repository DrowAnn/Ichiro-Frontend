import { Routes } from '@angular/router';
import { AuthGuard } from './servicios/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./inicio/inicio.component'),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component'),
  },
  {
    path: 'modulos',
    loadComponent: () =>
      import('./interfaz-modulos/interfaz-modulos.component'),
    canActivate: [AuthGuard],
    data: {
      rolesPermitidos: [
        'Super_Usuario',
        'Administrador',
        'Lider_De_Area',
        'Colaborador',
      ],
    },
  },
  {
    path: 'colaboradores',
    loadChildren: () =>
      import('./colaboradores/colaboradores.routes').then((m) => m.routes),
    canActivate: [AuthGuard],
    data: {
      rolesPermitidos: [
        'Super_Usuario',
        'Administrador',
        'Lider_De_Area',
        'Colaborador',
      ],
    },
  },
  {
    path: 'perfil-sociodemografico',
    loadComponent: () =>
      import('./datos-sociodemograficos/datos-sociodemograficos.component'),
    canActivate: [AuthGuard],
    data: {
      rolesPermitidos: ['Super_Usuario', 'Administrador'],
    },
  },
  {
    path: 'jornadas-laborales',
    loadComponent: () =>
      import('./jornadas-laborales/jornadas-laborales.component'),
    canActivate: [AuthGuard],
    data: {
      rolesPermitidos: ['Super_Usuario', 'Administrador', 'Lider_De_Area'],
    },
  },
  {
    path: 'liquidaciones-nominas',
    loadComponent: () =>
      import('./liquidaciones-nominas/liquidaciones-nominas.component'),
    canActivate: [AuthGuard],
    data: {
      rolesPermitidos: ['Super_Usuario', 'Administrador'],
    },
  },
  {
    path: 'usuarios',
    loadComponent: () => import('./usuarios/usuarios.component'),
    canActivate: [AuthGuard],
  },
  {
    path: 'error',
    loadComponent: () =>
      import('./componentes/pagina-error/pagina-error.component'),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./componentes/pagina-error/pagina-error.component'),
  },
];
