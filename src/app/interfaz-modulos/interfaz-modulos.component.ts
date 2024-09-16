import { AuthService } from './../servicios/auth/auth.service';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-interfaz-modulos',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './interfaz-modulos.component.html',
  styleUrl: './interfaz-modulos.component.scss',
})
export default class InterfazModulosComponent {
  rolUsuario = signal<string | undefined>('');
  constructor(private readonly authService: AuthService) {
    const infoUsuario = authService.obtenerInfoUsuario();
    this.rolUsuario.set(infoUsuario?.rol);
  }

  bolita() {}
}
