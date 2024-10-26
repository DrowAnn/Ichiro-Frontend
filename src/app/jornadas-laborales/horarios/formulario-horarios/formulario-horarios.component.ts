import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { JornadasLaboralesService } from '../../../servicios/jornadas-laborales/jornadas-laborales.service';
import { provideMomentDatetimeAdapter } from '@ng-matero/extensions-moment-adapter';
import { MatRadioModule } from '@angular/material/radio';
import { MtxDatetimepickerModule } from '@ng-matero/extensions/datetimepicker';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { HorariosDto } from './horarios.dto';

@Component({
  selector: 'app-formulario-horarios',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterModule,
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MtxDatetimepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MtxDatetimepickerModule,
  ],
  providers: [
    JornadasLaboralesService,
    provideMomentDatetimeAdapter({
      parse: {
        dateInput: 'YYYY-MM-DD',
        monthInput: 'MMMM',
        yearInput: 'YYYY',
        timeInput: 'HH:mm',
        datetimeInput: 'YYYY-MM-DD HH:mm',
      },
      display: {
        dateInput: 'YYYY-MM-DD',
        monthInput: 'MMMM',
        yearInput: 'YYYY',
        timeInput: 'HH:mm',
        datetimeInput: 'YYYY-MM-DD HH:mm',
        monthYearLabel: 'YYYY MMMM',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
        popupHeaderDateLabel: 'MMM DD, ddd',
      },
    }),
  ],
  templateUrl: './formulario-horarios.component.html',
  styleUrl: './formulario-horarios.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FormularioHorariosComponent {
  formularioHorarios: FormGroup;
  param = signal<string>('crearHorario');
  mensajeRespuesta = signal<string>('');
  estilosMensaje = signal<any>({});

  constructor(
    private readonly joranadasLaboralesService: JornadasLaboralesService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.formularioHorarios = this.fb.group({
      numeroIdentificacion: ['', Validators.required],
      fechaHoraIngresoProgramada: [null],
      fechaHoraSalidaProgramada: [null],
      horaDesayuno: [null],
      tiempoDesayuno: [null],
      horaAlmuerzo: [null],
      tiempoAlmuerzo: [null],
      horaCena: [null],
      tiempoCena: [null],
      horaOtroReceso: [null],
      tiempoReceso: [null],
      horasProgramadas: new FormControl({ value: null, disabled: true }),
      areaFuncionProgramada: [null],
      observacionNovedadesHorarios: [null],
      nombreModificadorHorarios: [null],
    });
  }

  fechaIngresoSignal = signal<string>('');
  fechaSalidaSignal = signal<string>('');
  timepoDesayunoSignal = signal<number>(0);
  timepoAlmuerzoSignal = signal<number>(0);
  timepoCenaSignal = signal<number>(0);
  timepoRecesoSignal = signal<number>(0);
  datosSemana = signal<HorariosDto[]>([]);
  datosMes = signal<HorariosDto[]>([]);

  fechaIngreso(fechaIngresada: string) {
    this.fechaIngresoSignal.set(fechaIngresada.toString());
    this.horasAcumuladasSemana();
    this.horasAcumuladasMes();
    console.log(this.horasProgramadasComputed());
  }

  fechaSalida(fechaSalida: string) {
    this.fechaSalidaSignal.set(fechaSalida.toString());
  }

  tiempoDesayuno(evento: Event) {
    const inputElement = evento.target as HTMLInputElement;
    this.timepoDesayunoSignal.set(inputElement.valueAsNumber);
  }

  tiempoAlmuerzo(evento: Event) {
    const inputElement = evento.target as HTMLInputElement;
    this.timepoAlmuerzoSignal.set(inputElement.valueAsNumber);
  }

  tiempoCena(evento: Event) {
    const inputElement = evento.target as HTMLInputElement;
    this.timepoCenaSignal.set(inputElement.valueAsNumber);
  }

  tiempoReceso(evento: Event) {
    this.timepoRecesoSignal.set(
      (evento.target as HTMLInputElement).valueAsNumber
    );
    console.log(this.timepoRecesoSignal());
  }

  horasProgramadasComputed = computed(() => {
    const tiempoMilisegundos: number =
      new Date(this.fechaSalidaSignal()).getTime() -
      new Date(this.fechaIngresoSignal()).getTime();
    console.log(tiempoMilisegundos);
    const tiempoCalculos =
      !tiempoMilisegundos || isNaN(tiempoMilisegundos) ? 0 : tiempoMilisegundos;
    const timepoHoras: number = tiempoCalculos / 3600000;
    const tiempoTotal: number =
      timepoHoras -
      (this.timepoDesayunoSignal() ?? 0) / 60 -
      (this.timepoAlmuerzoSignal() ?? 0) / 60 -
      (this.timepoCenaSignal() ?? 0) / 60 -
      (this.timepoRecesoSignal() ?? 0) / 60;
    console.log(tiempoTotal);
    return tiempoTotal;
  });

  async horasAcumuladasSemana() {
    const fechaReferencia: Date = new Date(this.fechaIngresoSignal());
    const ano: number = fechaReferencia.getFullYear();
    const mes: number = fechaReferencia.getMonth();
    const dia: number = fechaReferencia.getDate();
    const indexDay: number = fechaReferencia.getDay();
    const inicioSemana: number = dia - indexDay + 1;
    const fechaInicioSemana: Date = new Date(
      `${ano}-${mes + 1}-${inicioSemana} 00:00:00 GMT-0500`
    );
    let fechaPivote: Date = new Date();
    let fechaFinalSemana: Date = new Date();

    if (inicioSemana + 6 >= 28) {
      if (mes + 1 >= 12) {
        fechaPivote = new Date(`${ano + 1}-${1}-${1} 23:59:59 GMT-0500`);
        fechaFinalSemana = new Date(fechaPivote.setHours(-24));
      } else {
        fechaPivote = new Date(`${ano}-${mes + 2}-${1} 23:59:59 GMT-0500`);
        fechaFinalSemana = new Date(fechaPivote.setHours(-24));
      }
    } else {
      fechaFinalSemana = new Date(
        `${ano}-${mes + 1}-${inicioSemana + 6} 23:59:59 GMT-0500`
      );
    }
    this.joranadasLaboralesService
      .obtenerHorariosRango(fechaInicioSemana, fechaFinalSemana)
      .subscribe({
        next: (response) => {
          this.datosSemana.set(response);
          // console.log(this.datosSemana());
        },
        error: (error) => {
          console.log(error);
        },
      });

    // console.log(this.fechaIngresoSignal());
    // console.log(fechaInicioSemana);
    // console.log(fechaFinalSemana);
  }

  async horasAcumuladasMes() {
    const fechaReferencia: Date = new Date(this.fechaIngresoSignal());
    const ano: number = fechaReferencia.getFullYear();
    const mes: number = fechaReferencia.getMonth();
    const dia: number = fechaReferencia.getDate();
    const fechaInicioMes: Date = new Date(
      `${ano}-${mes + 1}-${1} 00:00:00 GMT-0500`
    );
    let fechaPivote: Date = new Date();
    let fechaFinalMes: Date = new Date();

    if (mes + 1 >= 12) {
      fechaPivote = new Date(`${ano + 1}-${1}-${1} 00:00:00 GMT-0500`);
      fechaFinalMes = new Date(fechaPivote.setSeconds(-1));
    } else {
      fechaPivote = new Date(`${ano}-${mes + 2}-${1} 00:00:00 GMT-0500`);
      fechaFinalMes = new Date(fechaPivote.setSeconds(-1));
    }

    this.joranadasLaboralesService
      .obtenerHorariosRango(fechaInicioMes, fechaFinalMes)
      .subscribe({
        next: (response) => {
          this.datosMes.set(response);
          // console.log(this.datosMes());
        },
        error: (error) => {
          console.log(error);
        },
      });

    // console.log(this.fechaIngresoSignal());
    // console.log(fechaInicioMes);
    // console.log(fechaFinalMes);
  }

  calculoHorasAcumuladas(data: HorariosDto[]) {
    let acumulador: number = 0;
    for (let i = 0; i < data.length; i++) {
      acumulador += data[i].horasProgramadas;
    }
    return acumulador;
  }

  horasProgramadasSemana = computed(() => {
    return this.calculoHorasAcumuladas(this.datosSemana());
  });

  horasProgramadasMes = computed(() => {
    return this.calculoHorasAcumuladas(this.datosMes());
  });
}
