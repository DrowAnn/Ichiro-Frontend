import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-colaboradores',
  standalone: true,
  imports: [MatButtonModule, RouterOutlet],
  templateUrl: './colaboradores.component.html',
  styleUrl: './colaboradores.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ColaboradoresComponent {}
