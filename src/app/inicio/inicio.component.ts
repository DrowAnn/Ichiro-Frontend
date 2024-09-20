import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../servicios/auth/auth.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
})
export default class InicioComponent {
  estadoToken = signal<boolean>(false);

  constructor(private readonly authService: AuthService) {
    this.estadoToken.set(!this.authService.tokenExpirado());
  }
}
