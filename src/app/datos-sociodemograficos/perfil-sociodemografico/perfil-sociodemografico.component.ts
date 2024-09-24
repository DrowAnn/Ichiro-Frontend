import { Colaborador } from '../../colaboradores/colaborador';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  templateUrl: './perfil-sociodemografico.component.html',
  styleUrl: './perfil-sociodemografico.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PerfilSociodemograficoComponent {
  formularioColaborador: FormGroup;
  param: string = 'crearUsuario';
  mensajeRespuesta = signal<string>('');
  estilosMensaje = signal<any>({});

  constructor(
    private readonly colaboradoresService: ColaboradoresService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
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
    if (this.param && this.param !== 'crearUsuario') {
      this.colaboradoresService.obtenerColaborador(this.param).subscribe({
        next: (response: Colaborador) => {
          if (response.fechaNacimiento) {
            let fn = new Date(response.fechaNacimiento ?? '');
            response.fechaNacimiento = new Date(
              fn.setHours(fn.getHours() + 10)
            );
          }
          if (response.fechaIngreso) {
            let fi = new Date(response.fechaIngreso ?? '');
            response.fechaIngreso = new Date(fi.setHours(fi.getHours() + 10));
          }
          this.formularioColaborador.patchValue(response);
        },
      });
    }
  }

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
              });
            }
          },
          error: (error) => {
            this.mensajeRespuesta.set('No se pudo crear el colaborador');
            this.estilosMensaje.set({ color: 'red' });
            console.log(error);
          },
        });
      } else {
        this.colaboradoresService
          .actualizarColaborador(this.param, datosColaborador)
          .subscribe({
            next: (response) => {
              if (response) {
                this.mensajeRespuesta.set('Colaborador actualizado con exito');
                this.estilosMensaje.set({
                  color: 'rgb(0, 200, 0)',
                });
              }
            },
            error: (error) => {
              this.mensajeRespuesta.set('No se pudo actualizar el colaborador');
              this.estilosMensaje.set({ color: 'red' });
              console.log(error);
            },
          });
      }
    }
    this.mensajeRespuesta.set(
      'Error en la solicitud, Faltan campos requeridos'
    );
  }

  retirarColaborador(): void {
    this.colaboradoresService
      .actualizarColaborador(this.param, { activo: false })
      .subscribe({
        next: (response) => {
          if (response) {
            this.mensajeRespuesta.set('Colaborador retirado con exito');
            this.estilosMensaje.set({
              color: 'rgb(0, 200, 0)',
            });
            setTimeout(() => {
              this.router.navigate(['/colaboradores']);
            }, 1000);
          }
        },
        error: (error) => {
          this.mensajeRespuesta.set('No se pudo retirar el colaborador');
          this.estilosMensaje.set({ color: 'red' });
          console.log(error);
        },
      });
  }
}
