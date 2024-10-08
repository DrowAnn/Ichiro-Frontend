import { Colaborador } from '../colaboradores.dto';
import { Component, signal } from '@angular/core';
import { ColaboradoresService } from '../../servicios/colaboradores/colaboradores.service';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [
    MatListModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    CommonModule,
    RouterModule,
  ],
  providers: [ColaboradoresService],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.scss',
})
export default class ListadoComponent {
  listaColaboradores = signal<Colaborador[]>([]);
  areas: string[] = [
    'Asistencial',
    'Administrativo',
    'Financiero',
    'Estetica',
    'Comercial',
    'Recepcion',
    'Programacion',
    'Instrumental_Y_Central_De_Lavado',
    'Farmacia',
    'Hospitalizacion',
    'Servicios_Generales',
    'Mantenimiento',
    'Medicina_General',
    'Rayos_X',
  ].sort();

  constructor(
    private readonly colaboradoresService: ColaboradoresService,
    private router: Router
  ) {
    this.colaboradoresService.obtenerColaboradores().subscribe({
      next: (response: Colaborador[]) => {
        this.listaColaboradores.set(response);
        this.listaColaboradores().sort((a, b) => {
          if ((a?.area ?? '').localeCompare(b?.area ?? '') == 0) {
            return a.primerNombre.localeCompare(b.primerNombre);
          }
          return (a?.area ?? '').localeCompare(b?.area ?? '');
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
