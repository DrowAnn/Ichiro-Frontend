import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-formulario-horarios',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './formulario-horarios.component.html',
  styleUrl: './formulario-horarios.component.scss',
})
export default class FormularioHorariosComponent {}
