import { Component, signal } from '@angular/core';
import { ColaboradoresService } from '../../servicios/colaboradores/colaboradores.service';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

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
  ],
  providers: [ColaboradoresService],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.scss',
})
export default class ListadoComponent {
  listaColaboradores = signal<any>('');

  constructor(private readonly colaboradoresService: ColaboradoresService) {
    this.colaboradoresService.obtenerColaboradores().subscribe({
      next: (response) => {
        this.listaColaboradores.set(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
