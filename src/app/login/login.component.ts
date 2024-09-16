import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  oculto = signal<boolean>(true);
  datosFormulario: FormGroup;
  mensajeError = signal<string>('');

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private readonly authService: AuthService
  ) {
    this.datosFormulario = formBuilder.group({
      nombreUsuario: ['', [Validators.required]],
      contrasena: ['', [Validators.required]],
    });
  }

  ocultarContrasena(evento: MouseEvent) {
    this.oculto.set(!this.oculto());
    evento.stopPropagation();
    evento.preventDefault();
  }

  botonIngresar() {
    console.log(this.datosFormulario);
    if (this.datosFormulario.valid) {
      const { nombreUsuario, contrasena } = this.datosFormulario.value;
      this.authService.login(nombreUsuario, contrasena).subscribe({
        next: (respuesta) => {
          this.authService.guardarToken(respuesta);
          this.router.navigate(['modulos']);
        },
        error: (error) => {
          console.log(error);
          this.mensajeError.set(error.error.message);
        },
      });
    }
  }
}
