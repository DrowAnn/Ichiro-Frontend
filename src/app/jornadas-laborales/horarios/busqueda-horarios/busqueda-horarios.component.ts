import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-busqueda-horarios',
  standalone: true,
  imports: [MatInputModule, CommonModule, MatRadioModule, FormsModule],
  templateUrl: './busqueda-horarios.component.html',
  styleUrl: './busqueda-horarios.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BusquedaHorariosComponent {
  tipoBusqueda = signal<string>('');
}
