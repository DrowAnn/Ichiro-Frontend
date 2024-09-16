import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const rolEsperado: string[] = route.data['rolesPermitidos'];
    if (this.authService.estadoAutenticado()) {
      const infoUsuario = this.authService.obtenerInfoUsuario();
      if (infoUsuario && rolEsperado.includes(infoUsuario.rol)) {
        return true;
      } else {
        this.router.navigate(['error']);
        return false;
      }
    }
    this.router.navigate(['login']);
    return false;
  }
}
