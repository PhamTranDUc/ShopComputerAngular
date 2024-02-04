import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {} // Tiêm UserService

  canActivate(): boolean {
    if (this.authService.isLogin()) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
