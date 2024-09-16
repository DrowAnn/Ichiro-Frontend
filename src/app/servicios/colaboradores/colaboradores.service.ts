import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColaboradoresService {
  url = 'http://localhost:3000/colaboradores';

  constructor(private http: HttpClient) {}

  obtenerColaboradores() {
    return this.http.get(this.url);
  }
}
