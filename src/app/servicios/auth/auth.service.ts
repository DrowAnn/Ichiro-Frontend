import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface InfoUsuario {
  nombreUsuario: string;
  rol: string;
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  tokenKey = 'accessToken';

  constructor(private http: HttpClient) {}

  private url: string = 'http://localhost:3000/auth';

  login(nombreUsuario: string, contrasena: string): Observable<any> {
    return this.http.post(`${this.url}/login`, {
      nombreUsuario: nombreUsuario,
      contrasena: contrasena,
    });
  }

  guardarToken(respuesta: any): void {
    localStorage.setItem('accessToken', respuesta.accessToken);
  }

  leerToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  eliminarToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.tokenKey);
    }
  }

  obtenerInfoUsuario(): InfoUsuario | null {
    const token = this.leerToken();
    if (token) {
      try {
        return jwtDecode(token);
      } catch (error) {
        console.log('Token no decifrado: ', error);
        return null;
      }
    }
    return null;
  }

  tokenExpirado(): boolean {
    const infoUsuario = this.obtenerInfoUsuario();
    if (infoUsuario && infoUsuario.exp) {
      const fechaExpiracion = infoUsuario.exp * 1000;
      return Date.now() > fechaExpiracion;
    }
    return true;
  }

  estadoAutenticado(): boolean {
    const token = this.leerToken();
    return token !== null && !this.tokenExpirado();
  }
}
