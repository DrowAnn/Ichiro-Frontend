import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AuthService } from '../../servicios/auth/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pagina-error',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './pagina-error.component.html',
  styleUrl: './pagina-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PaginaErrorComponent {
  usuario = signal<string | undefined>('');
  rolUsuario = signal<string | undefined>('');

  constructor(private readonly authService: AuthService) {
    this.usuario.set(
      authService.obtenerInfoUsuario()?.nombreUsuario.toUpperCase()
    );
    this.rolUsuario.set(authService.obtenerInfoUsuario()?.rol.toUpperCase());
  }
}
