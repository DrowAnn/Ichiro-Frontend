import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
})
export default class InicioComponent {}
