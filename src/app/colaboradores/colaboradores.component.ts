import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ColaboradoresService } from '../servicios/colaboradores/colaboradores.service';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-colaboradores',
  standalone: true,
  imports: [MatButtonModule, RouterOutlet],
  providers: [],
  templateUrl: './colaboradores.component.html',
  styleUrl: './colaboradores.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ColaboradoresComponent {}
