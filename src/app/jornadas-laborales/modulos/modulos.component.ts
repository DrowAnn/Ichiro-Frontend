import { CommonModule } from '@angular/common';
import { AuthService } from '../../servicios/auth/auth.service';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CardsModulosComponent } from '../../componentes/cards-modulos/cards-modulos.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-modulos',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    CommonModule,
    CardsModulosComponent,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './modulos.component.html',
  styleUrl: './modulos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ModulosComponent implements AfterViewInit {
  rolUsuario = signal<string>('');

  constructor(private readonly authService: AuthService) {
    const infoUsuario = authService.obtenerInfoUsuario();
    this.rolUsuario.set(infoUsuario?.rol ?? '');
  }

  ngAfterViewInit(): void {
    this.tamanoElementos();
    window.addEventListener('resize', this.tamanoElementos);
  }

  tamanoElementos(): void {
    const contenedor = document.getElementById('contenedor');
    const tarjetaModulo = document.getElementById('modulo0');
    const enlaces = document.getElementById('enlaces');
    const boton1 = document.getElementById('boton1');
    const boton2 = document.getElementById('boton2');
    const screenWidth = window.innerWidth;

    const contenedorWidth = contenedor ? contenedor.clientWidth : 0;
    const tarjetaWidth = tarjetaModulo ? tarjetaModulo.clientWidth : 0;
    const enlacesWidth = tarjetaWidth * 2 + (screenWidth / 100) * 0.2;
    const botonWidth = (contenedorWidth - enlacesWidth) / 2;

    enlaces
      ? (enlaces.style.width = `${enlacesWidth}px`)
      : console.log('Asignación no realizada');
    boton1 ? (boton1.style.width = `${botonWidth}px`) : 0;
    boton2 ? (boton2.style.width = `${botonWidth}px`) : 0;
  }

  infoModulos = [
    {
      perfilImg: '/imagenes/ho.png',
      titulo: 'Horarios',
      subtitulo: 'RRHH',
      contenido:
        'En este módulo podrás asignar, consultar y/o administrar los horarios de cada colaborador',
      href: '/jornadas-laborales/horarios',
      roles: ['Super_Usuario', 'Administrador', 'Lider_De_Area', 'Colaborador'],
    },
    {
      perfilImg: '/imagenes/ah.png',
      titulo: 'Auditoria de Horarios',
      subtitulo: 'Financiero',
      contenido:
        'En este módulo podrás consultar y/o auditar los horarios asignados de cada colaborador',
      href: '/jornadas-laborales/auditorias-horarios',
      roles: ['Super_Usuario', 'Administrador'],
    },
    {
      perfilImg: '/imagenes/lh.png',
      titulo: 'Liquidación de Horas',
      subtitulo: 'Financiero',
      contenido:
        'En este módulo podrás consultar y/o causar las liquidaciones de las horas laboradas de cada colaborador, su cumplimiento y el cálculos de recargos y horas extras',
      href: '/jornadas-laborales/liquidaciones-horas',
      roles: ['Super_Usuario', 'Administrador'],
    },
  ];
}
