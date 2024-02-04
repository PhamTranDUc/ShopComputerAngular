import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userDetail: any;
  constructor(private http: HttpClient, private router: Router) {
    this.userDetail = this.decodeToken();
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  isLogin(): boolean {
    return !!localStorage.getItem('token');
  }

  decodeToken() {
    const jwtHelperService = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelperService.decodeToken(token);
  }

  public getUserNameFromToken() {
    if (this.userDetail) {
      return this.userDetail.userName;
    }
  }

  public getRoleFromToken() {
    if (this.userDetail) {
      return this.userDetail.role;
    }
  }

  getUserNameInLocalStorage() {
    return localStorage.getItem('userName');
  }
  getRoleInLocalStorage() {
    return localStorage.getItem('role');
  }
}
