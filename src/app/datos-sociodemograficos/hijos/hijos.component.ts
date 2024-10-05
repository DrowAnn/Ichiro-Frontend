import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ColaboradoresService } from '../../servicios/colaboradores/colaboradores.service';
import { DatosHijosDto } from '../datos-hijos.dto';
import { DatosSociodemograficosService } from '../../servicios/datos-sociodemograficos/datos-sociodemograficos.service';

@Component({
  selector: 'app-hijos',
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
  providers: [DatosSociodemograficosService, ColaboradoresService],
  templateUrl: './hijos.component.html',
  styleUrl: './hijos.component.scss',
})
export default class HijosComponent {
  listaHijos = signal<DatosHijosDto[]>([]);
  param: string = '';
  nombreColaborador = signal<string>('');

  constructor(
    private readonly datosSociodemograficosService: DatosSociodemograficosService,
    private readonly colaboradoresService: ColaboradoresService,
    route: ActivatedRoute
  ) {
    this.param = route.snapshot.paramMap.get('numeroIdentificacion') ?? '';

    if (this.param !== '') {
      this.colaboradoresService.obtenerColaborador(this.param).subscribe({
        next: (response) => {
          this.nombreColaborador.set(
            `${response.primerNombre} ${response.primerApellido}`
          );
        },
      });

      this.datosSociodemograficosService
        .obtenerTodosDatosHijosColaborador(this.param)
        .subscribe({
          next: (response: DatosHijosDto[]) => {
            this.listaHijos.set(response);
            this.listaHijos().sort((a, b) => {
              if (
                (a?.nombreHijo ?? '').localeCompare(b?.nombreHijo ?? '') == 0
              ) {
                return a.identificacionHijo.localeCompare(b.identificacionHijo);
              }
              return (a?.nombreHijo ?? '').localeCompare(b?.nombreHijo ?? '');
            });
          },
        });
    }
  }
}
