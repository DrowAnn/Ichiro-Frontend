import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const rolEsperado: string[] = route.data['rolesPermitidos'];

    if (!this.authService.tokenExpirado()) {
      const infoUsuario = this.authService.obtenerInfoUsuario();
      if (infoUsuario && rolEsperado.includes(infoUsuario.rol)) {
        return true;
      } else {
        this.router.navigate(['error']);
        return false;
      }
    }
    return false;
  }
}
