import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cards-modulos',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CommonModule, RouterModule],
  templateUrl: './cards-modulos.component.html',
  styleUrl: './cards-modulos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsModulosComponent {
  @Input() perfilImg: string = '';
  @Input() titulo: string = '';
  @Input() subtitulo: string = '';
  @Input() imagen: string = '';
  @Input() contenido: string = '';
  @Input() href: string = '';
}
