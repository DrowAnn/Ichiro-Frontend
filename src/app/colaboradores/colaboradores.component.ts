import { Component } from '@angular/core';
import { ColaboradoresService } from '../servicios/colaboradores/colaboradores.service';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-colaboradores',
  standalone: true,
  imports: [MatButtonModule, HttpClientModule],
  providers: [ColaboradoresService],
  templateUrl: './colaboradores.component.html',
  styleUrl: './colaboradores.component.scss',
})
export default class ColaboradoresComponent {
  constructor(private readonly colaboradoresService: ColaboradoresService) {}

  obtenerColaboradores() {
    this.colaboradoresService.obtenerColaboradores().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
