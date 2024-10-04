import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosSociodemograficosDto } from '../../datos-sociodemograficos/datos-sociodemograficos.dto';
import { enviroment } from '../../../env/enviroment';
import { DatosHijosDto } from '../../datos-sociodemograficos/datos-hijos.dto';

@Injectable({
  providedIn: 'root',
})
export class DatosSociodemograficosService {
  private urlDatosSociodemograficos =
    enviroment.backendUrl + '/datos-sociodemograficos';
  private urlDatosHijos = enviroment.backendUrl + '/datos-hijos';

  constructor(private http: HttpClient) {}

  //Datos Sociodemograficos Colaborador

  obtenerTodosDatosSociodemograficos(): Observable<
    DatosSociodemograficosDto[]
  > {
    return this.http.get<DatosSociodemograficosDto[]>(
      this.urlDatosSociodemograficos
    );
  }

  obtenerDatosSociodemograficos(
    numeroIdentificacion: string
  ): Observable<DatosSociodemograficosDto> {
    return this.http.get<DatosSociodemograficosDto>(
      `${this.urlDatosSociodemograficos}/${numeroIdentificacion}`
    );
  }

  crearDatosSociodemograficos(
    datosColaborador: DatosSociodemograficosDto
  ): Observable<DatosSociodemograficosDto> {
    return this.http.post<DatosSociodemograficosDto>(
      `${this.urlDatosSociodemograficos}`,
      datosColaborador
    );
  }

  actualizarDatosSociodemograficos(
    numeroIdentificacion: string,
    datosColaborador: Partial<DatosSociodemograficosDto>
  ): Observable<DatosSociodemograficosDto> {
    return this.http.patch<DatosSociodemograficosDto>(
      `${this.urlDatosSociodemograficos}/${numeroIdentificacion}`,
      datosColaborador
    );
  }

  //Datos Hijos

  obtenerTodosDatosHijosColaborador(): Observable<DatosHijosDto[]> {
    return this.http.get<DatosHijosDto[]>(this.urlDatosHijos);
  }

  obtenerDatosHijoColaborador(
    numeroIdentificacion: string
  ): Observable<DatosHijosDto[]> {
    return this.http.get<DatosHijosDto[]>(
      `${this.urlDatosHijos}/${numeroIdentificacion}`
    );
  }

  crearDatosHijoColaborador(data: DatosHijosDto): Observable<DatosHijosDto> {
    return this.http.post<DatosHijosDto>(`${this.urlDatosHijos}`, data);
  }

  actualizarDatosHijoColaborador(
    numeroIdentificacion: string,
    identificacionHijo: string,
    data: Partial<DatosHijosDto>
  ): Observable<DatosHijosDto> {
    return this.http.patch<DatosHijosDto>(
      `${this.urlDatosHijos}/${numeroIdentificacion}/${identificacionHijo}`,
      data
    );
  }
}
