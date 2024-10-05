import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
import { DatosSociodemograficosService } from '../../servicios/datos-sociodemograficos/datos-sociodemograficos.service';
import { DatosSociodemograficosDto } from '../datos-sociodemograficos.dto';
import { MatStepperModule } from '@angular/material/stepper';

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
    MatStepperModule,
  ],
  providers: [DatosSociodemograficosService, provideNativeDateAdapter()],
  templateUrl: './perfil-sociodemografico.component.html',
  styleUrl: './perfil-sociodemografico.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PerfilSociodemograficoComponent {
  formularioDatosSociodemograficos: FormGroup;
  param = signal<string>('crearUsuario');
  mensajeRespuesta = signal<string>('');
  estilosMensaje = signal<any>({});

  constructor(
    private readonly datosSociodemograficosService: DatosSociodemograficosService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.formularioDatosSociodemograficos = this.fb.group({
      numeroIdentificacion: ['', [Validators.required]],
      estadoCivil: [null],
      estratoSocioeconomico: [null],
      tipoVivienda: [null],
      grupoSanguineo: [null],
      enfermedadesDiagnosticadasPermanentes: [false],
      tiposEnfermedadesPermanentes: [null],
      medicamentoRecetadoPermanente: [false],
      tiposMedicamentosPermanentes: [null],
      fuma: [false],
      consumeBebidasAlcoholicas: [false],
      consumeBebidasEnergeticasConstantemente: [false],
      practicaDeportivaRegular: [false],
      otroTrabajo: [false],
      laboresDomesticas: [false],
      recreacionDeporte: [false],
      estudio: [false],
      otraActividad: [false],
      vacunacion: [false],
      saludOral: [false],
      valoracionMedicoOcupacional: [false],
      examenesLaboratorio: [false],
      spaRelajacionSimilar: [false],
      actividadesSST: [false],
      ninguna: [false],
      cantidadDosisCovid19: [null],
      ultimaAplicacion: [null],
      nombreConyuge: [null],
      edadConyuge: [null],
      telefonoConyuge: [null],
      tieneHijos: [false],
      cuantosHijosTiene: [null],
      personasNucleoFamiliar: [null],
      personasDependientesEconomicamente: [null],
      parentescos: [null],
      eps: [null],
      fondoPension: [null],
      arl: [null],
      nombreContactoEmergencia: [null],
      telefonoContactoEmergencia: [null],
      parentescoContactoEmergencia: [null],
    });

    this.param.set(
      this.route.snapshot.paramMap.get('numeroIdentificacion') ?? ''
    );
    if (this.param() && this.param() !== 'crearUsuario') {
      this.datosSociodemograficosService
        .obtenerDatosSociodemograficos(this.param())
        .subscribe({
          next: (response: DatosSociodemograficosDto) => {
            console.log(response);
            if (response) {
              if (response.ultimaAplicacion) {
                let ua = new Date(response.ultimaAplicacion ?? '');
                response.ultimaAplicacion = new Date(
                  ua.setHours(ua.getHours() + 10)
                );
              }
              this.formularioDatosSociodemograficos.patchValue(response);
            } else {
              this.formularioDatosSociodemograficos.patchValue({
                numeroIdentificacion: this.param(),
              });
              this.param.set('crearUsuario');
              this.mensajeRespuesta.set(
                'El Usuario NO tiene creado su Perfil Sociodemografico'
              );
            }
          },
        });
    }
  }

  enviarInformacion(): void {
    if (this.formularioDatosSociodemograficos.valid) {
      const datosSociodemograficos: DatosSociodemograficosDto =
        this.formularioDatosSociodemograficos.value;
      datosSociodemograficos.ultimaAplicacion = new Date(
        datosSociodemograficos.ultimaAplicacion?.toISOString() ?? ''
      );
      if (this.param() === 'crearUsuario') {
        this.datosSociodemograficosService
          .crearDatosSociodemograficos(datosSociodemograficos)
          .subscribe({
            next: (response) => {
              if (response) {
                this.param.set(response.numeroIdentificacion);
                this.mensajeRespuesta.set(
                  'Perfil sociodemográfico creado con exito'
                );
                this.estilosMensaje.set({
                  color: 'rgb(0, 200, 0)',
                });
              }
            },
            error: (error) => {
              this.mensajeRespuesta.set(
                'No se pudo crear el perfil sociodemográfico'
              );
              this.estilosMensaje.set({ color: 'red' });
              console.log(error);
            },
          });
      } else {
        this.datosSociodemograficosService
          .actualizarDatosSociodemograficos(
            this.param(),
            datosSociodemograficos
          )
          .subscribe({
            next: (response) => {
              if (response) {
                this.mensajeRespuesta.set(
                  'Perfil sociodemográfico actualizado con exito'
                );
                this.estilosMensaje.set({
                  color: 'rgb(0, 200, 0)',
                });
              }
            },
            error: (error) => {
              this.mensajeRespuesta.set(
                'No se pudo actualizar el perfil sociodemográfico'
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
}
