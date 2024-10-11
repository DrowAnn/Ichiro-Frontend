import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-jornadas-laborales',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './jornadas-laborales.component.html',
  styleUrl: './jornadas-laborales.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class JornadasLaboralesComponent {}
