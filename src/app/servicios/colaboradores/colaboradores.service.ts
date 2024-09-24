import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Colaborador } from '../../colaboradores/colaborador';

@Injectable({
  providedIn: 'root',
})
export class ColaboradoresService {
  url = 'http://localhost:3000/colaboradores';

  constructor(private http: HttpClient) {}

  obtenerColaboradores(): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(this.url);
  }

  obtenerColaborador(numeroIdentificacion: string): Observable<Colaborador> {
    return this.http.get<Colaborador>(`${this.url}/${numeroIdentificacion}`);
  }

  crearColaborador(datosColaborador: Colaborador): Observable<Colaborador> {
    return this.http.post<Colaborador>(`${this.url}`, datosColaborador);
  }

  actualizarColaborador(
    numeroIdentificacion: string,
    datosColaborador: Partial<Colaborador>
  ): Observable<Colaborador> {
    return this.http.patch<Colaborador>(
      `${this.url}/${numeroIdentificacion}`,
      datosColaborador
    );
  }
}
