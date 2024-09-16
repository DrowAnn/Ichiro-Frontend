import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interfaz-modulos',
  standalone: true,
  imports: [],
  templateUrl: './interfaz-modulos.component.html',
  styleUrl: './interfaz-modulos.component.scss',
})
export default class InterfazModulosComponent implements OnInit {
  accessToken: string | null = null;

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.accessToken = localStorage.getItem('accessToken');
      console.log(this.accessToken);
    }
  }
}
