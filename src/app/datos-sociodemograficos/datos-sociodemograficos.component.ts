import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-datos-sociodemograficos',
  standalone: true,
  imports: [MatButtonModule, RouterOutlet],
  templateUrl: './datos-sociodemograficos.component.html',
  styleUrl: './datos-sociodemograficos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DatosSociodemograficosComponent {}
