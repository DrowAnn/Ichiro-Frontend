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
// import { CustomHeader } from './custom-header.component';

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

  fechaIngesoSignal = signal<string>('');
  fechaSalidaSignal = signal<string>('');
  timepoDesayunoSignal = signal<number>(0);
  timepoAlmuerzoSignal = signal<number>(0);
  timepoCenaSignal = signal<number>(0);
  timepoRecesoSignal = signal<number>(0);

  fechaIngreso(fechaIngresada: string) {
    this.fechaIngesoSignal.set(fechaIngresada.toString());
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

  horasProgramadasSignal = computed(() => {
    const tiempoMilisegundos: number =
      new Date(this.fechaSalidaSignal()).getTime() -
      new Date(this.fechaIngesoSignal()).getTime();
    const tiempoCalculos = isNaN(tiempoMilisegundos) ? 0 : tiempoMilisegundos;
    const timepoHoras: number = tiempoCalculos / 3600000;
    const tiempoTotal: number =
      timepoHoras -
      (this.timepoDesayunoSignal() ?? 0) / 60 -
      (this.timepoAlmuerzoSignal() ?? 0) / 60 -
      (this.timepoCenaSignal() ?? 0) / 60 -
      (this.timepoRecesoSignal() ?? 0) / 60;
    return tiempoTotal;
  });
}
