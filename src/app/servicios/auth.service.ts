import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private url: string = 'http://localhost:3000/auth';

  login(nombreUsuario: string, contrasena: string): Observable<any> {
    return this.http.post(`${this.url}/login`, {
      nombreUsuario: nombreUsuario,
      contrasena: contrasena,
    });
  }
}
