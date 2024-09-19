import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UsuariosComponent {}
