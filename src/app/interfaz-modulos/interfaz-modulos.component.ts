import { CommonModule } from '@angular/common';
import { AuthService } from './../servicios/auth/auth.service';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CardsModulosComponent } from '../componentes/cards-modulos/cards-modulos.component';

@Component({
  selector: 'app-interfaz-modulos',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    CommonModule,
    CardsModulosComponent,
  ],
  templateUrl: './interfaz-modulos.component.html',
  styleUrl: './interfaz-modulos.component.scss',
})
export default class InterfazModulosComponent {
  rolUsuario = signal<string>('');

  constructor(private readonly authService: AuthService) {
    const infoUsuario = authService.obtenerInfoUsuario();
    this.rolUsuario.set(infoUsuario?.rol ?? '');
  }

  infoModulos = [
    {
      perfilImg: '/imagenes/imagenPrueba.jpg',
      titulo: 'Colaboradores',
      subtitulo: 'RRHH',
      contenido:
        'En este módulo podrás consultar y/o administrar los datos laborales de cada colaborador de la compañía',
      href: 'colaboradores',
      roles: ['Colaborador', 'Super_Usuario'],
    },
    {
      perfilImg: '/imagenes/imagenPrueba.jpg',
      titulo: 'Perfil Sociodemográfico',
      subtitulo: 'RRHH',
      contenido:
        'En este módulo podrás consultar y/o administrar el perfil sociodemográfico de cada colaborador de la compañía',
      href: 'perfil-sociodemografico',
      roles: ['Colaborador', 'Super_Usuario'],
    },
    {
      perfilImg: '/imagenes/imagenPrueba.jpg',
      titulo: 'Jornadas Laborales',
      subtitulo: 'RRHH',
      contenido:
        'En este módulo podrás consultar y/o administrar las jornadas laborales de cada colaborador, su cumplimiento y el cálculos de recargos y horas extras',
      href: 'jornadas-laborales',
      roles: ['Colaborador', 'Super_Usuario'],
    },
    {
      perfilImg: '/imagenes/imagenPrueba.jpg',
      titulo: 'Liquidaciones de Nóminas',
      subtitulo: 'Financiero',
      contenido:
        'En este módulo podrás consultar y/o administrar las liquidaciones de nóminas de cada colaborador, el monto de pago y los detalles de liquidación',
      href: 'liquidaciones-nominas',
      roles: ['Colaborador', 'Super_Usuario'],
    },
  ];
}
