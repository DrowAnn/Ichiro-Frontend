import { Colaborador } from './../colaborador';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ColaboradoresService } from '../../servicios/colaboradores/colaboradores.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';

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
    MatDatepickerModule,
    MatSelectModule,
    MatCheckboxModule,
    CommonModule,
  ],
  providers: [ColaboradoresService, provideNativeDateAdapter()],
  templateUrl: './datos-personales.component.html',
  styleUrl: './datos-personales.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DatosPersonalesComponent {
  param: string = 'crearUsuario';
  mensajeRespuesta = signal<string>('No se pudo crear el colaborador');
  estilosMensaje = signal<any>({});

  constructor(
    private readonly colaboradoresService: ColaboradoresService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.formularioColaborador = this.fb.group({
      numeroIdentificacion: ['', [Validators.required]],
      primerNombre: ['', [Validators.required]],
      segundoNombre: [''],
      primerApellido: ['', [Validators.required]],
      segundoApellido: [''],
      celular: [''],
      correo: [''],
      direccion: [''],
      telefonoFijo: [''],
      fechaNacimiento: [null],
      fechaIngreso: [null],
      genero: [''],
      cargo: ['', [Validators.required]],
      area: [null, [Validators.required]],
      riesgoARL: [0],
      tipoContrato: [''],
      profesion: [''],
      escolaridad: [''],
      experienciaAnos: [0],
      salarioBase: [0.0],
      horasMensualesContratadas: [0],
      formaPago: [''],
      activo: [true],
    });

    this.param = this.route.snapshot.paramMap.get('numeroIdentificacion') ?? '';
    if (this.param !== 'crearUsuario') {
      this.colaboradoresService
        .obtenerColaborador(this.param ?? 'vacio')
        .subscribe({
          next: (response: Colaborador) => {
            this.formularioColaborador.patchValue(response);
          },
        });
    }
  }

  formularioColaborador: FormGroup;

  enviarInformacion(): void {
    if (this.formularioColaborador.valid) {
      const datosColaborador: Colaborador = this.formularioColaborador.value;
      datosColaborador.fechaNacimiento = new Date(
        datosColaborador.fechaNacimiento?.toISOString() ?? ''
      );

      datosColaborador.fechaIngreso = new Date(
        datosColaborador.fechaIngreso?.toISOString() ?? ''
      );
      if (this.param === 'crearUsuario') {
        this.colaboradoresService.crearColaborador(datosColaborador).subscribe({
          next: (response) => {
            if (response) {
              this.mensajeRespuesta.set('Colaborador creado con exito');
              this.estilosMensaje.set({
                color: 'rgb(0, 200, 0)',
                'font-weight': '500',
              });
            }
          },
          error: (error) => {
            this.mensajeRespuesta.set('No se pudo crear el colaborador');
            this.estilosMensaje.set({ color: 'red', 'font-weight': '500' });
            console.log(error);
          },
        });
      } else {
        console.log(datosColaborador.fechaNacimiento);
        this.colaboradoresService
          .actualizarColaborador(this.param, datosColaborador)
          .subscribe({
            next: (response) => {
              if (response) {
                this.mensajeRespuesta.set('Colaborador actualizado con exito');
                this.estilosMensaje.set({
                  color: 'rgb(0, 200, 0)',
                  'font-weight': '500',
                });
              }
            },
            error: (error) => {
              this.mensajeRespuesta.set('No se pudo actualizar el colaborador');
              this.estilosMensaje.set({ color: 'red', 'font-weight': '500' });
              console.log(error);
            },
          });
      }
    }
    this.mensajeRespuesta.set(
      'Error en la solicitud, Faltan campos requeridos'
    );
    this.estilosMensaje.set({ 'font-weight': '500' });
  }
}
