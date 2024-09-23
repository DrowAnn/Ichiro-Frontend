import { Colaborador } from './../colaborador';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ColaboradoresService } from '../../servicios/colaboradores/colaboradores.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-datos-personales',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatFormFieldModule,
    MatInput,
    ReactiveFormsModule,
  ],
  providers: [ColaboradoresService],
  templateUrl: './datos-personales.component.html',
  styleUrl: './datos-personales.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DatosPersonalesComponent {
  formularioColaborador: FormGroup;

  constructor(
    private readonly colaboradoresService: ColaboradoresService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.formularioColaborador = this.fb.group({
      numeroIdentificacion: [''],
      primerNombre: [''],
      segundoNombre: [''],
      primerApellido: [''],
      segundoApellido: [''],
      celular: [''],
      correo: [''],
      direccion: [''],
      telefonoFijo: [''],
      fechaNacimiento: [''],
      fechaIngreso: [''],
      genero: [''],
      cargo: [''],
      area: [''],
      riesgoARL: 0,
      tipoContrato: [''],
      profesion: [''],
      escolaridad: [''],
      experienciaAnos: 0,
      salarioBase: 0.0,
      horasMensualesContratadas: 0,
      formaPago: [''],
      activo: true,
    });
    console.log(this.formularioColaborador);
    let param = this.route.snapshot.paramMap.get('numeroIdentificacion');
    if (param !== 'crearUsuario') {
      this.colaboradoresService.obtenerColaborador(param ?? 'vacio').subscribe({
        next: (response: Colaborador) => {
          console.log(response);
          this.formularioColaborador.patchValue(response);
          console.log(this.formularioColaborador);
        },
      });
    }
  }
}
