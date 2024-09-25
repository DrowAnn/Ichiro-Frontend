import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosSociodemograficos } from '../../datos-sociodemograficos/datos-sociodemograficos';

@Injectable({
  providedIn: 'root',
})
export class ColaboradoresService {
  url = 'http://localhost:3000/datos-sociodemograficos';

  constructor(private http: HttpClient) {}

  obtenerColaboradores(): Observable<DatosSociodemograficos[]> {
    return this.http.get<DatosSociodemograficos[]>(this.url);
  }

  obtenerColaborador(
    numeroIdentificacion: string
  ): Observable<DatosSociodemograficos> {
    return this.http.get<DatosSociodemograficos>(
      `${this.url}/${numeroIdentificacion}`
    );
  }

  crearColaborador(
    datosColaborador: DatosSociodemograficos
  ): Observable<DatosSociodemograficos> {
    return this.http.post<DatosSociodemograficos>(
      `${this.url}`,
      datosColaborador
    );
  }

  actualizarColaborador(
    numeroIdentificacion: string,
    datosColaborador: Partial<DatosSociodemograficos>
  ): Observable<DatosSociodemograficos> {
    return this.http.patch<DatosSociodemograficos>(
      `${this.url}/${numeroIdentificacion}`,
      datosColaborador
    );
  }
}
