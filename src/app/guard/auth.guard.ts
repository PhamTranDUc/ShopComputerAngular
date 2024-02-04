import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {} // Tiêm UserService

  canActivate(): boolean {
    if (this.userService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}