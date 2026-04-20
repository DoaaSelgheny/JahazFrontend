import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Constants } from 'src/app/services/Constants/constants';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('access_token_zalool')) {
      return true;

    } else {
      this.authService.logout();
      return false;
    }
  }

  canLoad(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (localStorage.getItem('access_token_zalool')) {

    }
  }


  checkRouteAndPermission(): boolean {
    let route = location.href.toString();
    if (
      route != '' &&
      location.pathname != '/' &&
      !location.pathname.includes('auth')
    ) {
      if (
        this.authService.getCurrentUser().roles[0] ==
          Constants.AllRoles.ThalolSuperAdmin &&
        route.includes('admin')
      ) {
        return true;
      } else {
        this.router.navigate(['/error/505']);
        return false;
      }
    } else {
      return true;
    }
  }
}
