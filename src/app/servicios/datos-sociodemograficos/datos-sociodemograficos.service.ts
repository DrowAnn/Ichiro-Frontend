import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosSociodemograficos } from '../../datos-sociodemograficos/datos-sociodemograficos.dto';
import { enviroment } from '../../../env/enviroment';

@Injectable({
  providedIn: 'root',
})
export class DatosSociodemograficosService {
  url = enviroment.backendUrl + '/datos-sociodemograficos';

  constructor(private http: HttpClient) {}

  obtenerTodosDatosSociodemograficos(): Observable<DatosSociodemograficos[]> {
    return this.http.get<DatosSociodemograficos[]>(this.url);
  }

  obtenerDatosSociodemograficos(
    numeroIdentificacion: string
  ): Observable<DatosSociodemograficos> {
    return this.http.get<DatosSociodemograficos>(
      `${this.url}/${numeroIdentificacion}`
    );
  }

  crearDatosSociodemograficos(
    datosColaborador: DatosSociodemograficos
  ): Observable<DatosSociodemograficos> {
    return this.http.post<DatosSociodemograficos>(
      `${this.url}`,
      datosColaborador
    );
  }

  actualizarDatosSociodemograficos(
    numeroIdentificacion: string,
    datosColaborador: Partial<DatosSociodemograficos>
  ): Observable<DatosSociodemograficos> {
    return this.http.patch<DatosSociodemograficos>(
      `${this.url}/${numeroIdentificacion}`,
      datosColaborador
    );
  }
}
