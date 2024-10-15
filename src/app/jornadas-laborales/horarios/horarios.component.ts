import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './horarios.component.html',
  styleUrl: './horarios.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HorariosComponent {}
