import { Injectable } from '@angular/core';
import { enviroment } from '../../../env/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HorariosDto } from '../../jornadas-laborales/horarios/formulario-horarios/horarios.dto';

@Injectable({
  providedIn: 'root',
})
export class JornadasLaboralesService {
  private urlJornadasLaborales = enviroment.backendUrl + '/jornadas-laborales';
  private urlHorarios = enviroment.backendUrl + '/horarios';

  constructor(private http: HttpClient) {}

  //Horarios
  crearUnHorario(data: HorariosDto): Observable<HorariosDto> {
    return this.http.post<HorariosDto>(this.urlHorarios, data);
  }

  crearVariosHorarios(data: HorariosDto[]): Observable<HorariosDto[]> {
    return this.http.post<HorariosDto[]>(
      `${this.urlHorarios}/crear-varios`,
      data
    );
  }

  actualizarHorario(
    numeroIdentificacion: string,
    fechaHoraIngresoProgramada: Date,
    data: HorariosDto
  ): Observable<HorariosDto> {
    return this.http.patch<HorariosDto>(
      `${this.urlHorarios}/colaborador/${numeroIdentificacion}?fechaHoraIngresoProgramada=${fechaHoraIngresoProgramada}`,
      data
    );
  }

  obtenerHorariosDias(
    fechaHoraIngresoProgramada: Date
  ): Observable<HorariosDto[]> {
    return this.http.get<HorariosDto[]>(
      `${this.urlHorarios}/dias?fechaHoraIngresoProgramado=${fechaHoraIngresoProgramada}`
    );
  }

  obtenerHorariosRango(
    numeroIdentificacion: string,
    fechaInicialRango: Date,
    fechaFinalRango: Date
  ) {
    return this.http.get<HorariosDto[]>(
      `${this.urlHorarios}/rango/${numeroIdentificacion}?fechaHoraInicial=${fechaInicialRango}&fechaHoraFinal=${fechaFinalRango}`
    );
  }

  obtenerHorario(
    numeroIdentificacion: string,
    fechaHoraIngresoProgramada: Date
  ): Observable<HorariosDto> {
    return this.http.get<HorariosDto>(
      `${this.urlHorarios}/individual/${numeroIdentificacion}?fechaHoraIngresoProgramada=${fechaHoraIngresoProgramada}`
    );
  }

  obtenerHorariosColaborador(
    numeroIdentificacion: string
  ): Observable<HorariosDto[]> {
    return this.http.get<HorariosDto[]>(
      `${this.urlHorarios}/colaborador/${numeroIdentificacion}`
    );
  }
}
