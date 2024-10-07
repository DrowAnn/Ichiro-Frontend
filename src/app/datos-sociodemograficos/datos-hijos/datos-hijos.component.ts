import { DatosSociodemograficosService } from './../../servicios/datos-sociodemograficos/datos-sociodemograficos.service';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
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
import { DatosHijosDto } from '../datos-hijos.dto';

@Component({
  selector: 'app-datos-hijos',
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
  providers: [DatosSociodemograficosService, provideNativeDateAdapter()],
  templateUrl: './datos-hijos.component.html',
  styleUrl: './datos-hijos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DatosHijosComponent {
  formularioDatosHijo: FormGroup;
  params: Params = {};
  mensajeRespuesta = signal<string>('');
  estilosMensaje = signal<any>({});
  edadHijo = signal<number>(0);

  constructor(
    private readonly datosSociodemograficosService: DatosSociodemograficosService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.formularioDatosHijo = this.fb.group({
      numeroIdentificacion: [null, [Validators.required]],
      nombreHijo: [null],
      identificacionHijo: [null, [Validators.required]],
      fechaNacimientoHijo: [null],
      generoHijo: [null],
    });

    this.params = this.route.snapshot.params;

    this.formularioDatosHijo.patchValue({
      numeroIdentificacion: this.params['numeroIdentificacion'],
    });

    if (this.params['identificacionHijo'] !== 'crearHijo') {
      this.datosSociodemograficosService
        .obtenerDatosHijoColaborador(
          this.params['numeroIdentificacion'],
          this.params['identificacionHijo']
        )
        .subscribe({
          next: (response: DatosHijosDto) => {
            if (response.fechaNacimientoHijo) {
              let fn = new Date(response.fechaNacimientoHijo ?? '');
              response.fechaNacimientoHijo = new Date(
                fn.setHours(fn.getHours() + 10)
              );
            }
            this.formularioDatosHijo.patchValue(response);
            this.calculoEdad(
              this.formularioDatosHijo.get('fechaNacimientoHijo')?.value
            );
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }

  enviarInformacion(): void {
    if (this.formularioDatosHijo.valid) {
      const datosHijoColaborador: DatosHijosDto =
        this.formularioDatosHijo.value;
      datosHijoColaborador.fechaNacimientoHijo = new Date(
        datosHijoColaborador.fechaNacimientoHijo?.toISOString() ?? ''
      );
      if (this.params['identificacionHijo'] === 'crearHijo') {
        this.datosSociodemograficosService
          .crearDatosHijoColaborador(datosHijoColaborador)
          .subscribe({
            next: (response) => {
              if (response) {
                this.mensajeRespuesta.set(
                  'Hijo del colaborador creado con exito'
                );
                this.estilosMensaje.set({
                  color: 'rgb(0, 200, 0)',
                });
              }
            },
            error: (error) => {
              this.mensajeRespuesta.set(
                'No se pudo crear el hijo del colaborador'
              );
              this.estilosMensaje.set({ color: 'red' });
              console.log(error);
            },
          });
      } else {
        this.datosSociodemograficosService
          .actualizarDatosHijoColaborador(
            this.params['numeroIdentificacion'],
            this.params['identificacionHijo'],
            datosHijoColaborador
          )
          .subscribe({
            next: (response) => {
              if (response) {
                this.mensajeRespuesta.set(
                  'Hijo del colaborador actualizado con exito'
                );
                this.estilosMensaje.set({
                  color: 'rgb(0, 200, 0)',
                });
              }
            },
            error: (error) => {
              this.mensajeRespuesta.set(
                'No se pudo actualizar el hijo del colaborador'
              );
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

  calculoEdad(fechaNacimiento: string) {
    if (fechaNacimiento !== null) {
      const tiempo: number =
        new Date().getTime() - new Date(fechaNacimiento).getTime();
      this.edadHijo.set(Math.floor(tiempo / (1000 * 60 * 60 * 24 * 365.25)));
    } else {
      this.edadHijo.set(0);
    }
  }
}
