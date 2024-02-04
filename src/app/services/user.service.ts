import { APP_ID, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { userDto } from '../dtos/user.dto';
import e from 'express';
import { isPlatformBrowser } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userDetail: any;
  private apiUrlRegister =
    'http://localhost:8080/ShopBookPTD/api/v1/users/register';
  private apiUrlLogin = 'http://localhost:8080/ShopBookPTD/api/v1/users/login';
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string,
    private router : Router
  ) {

  }
  register(data: any): Observable<any> {
    // const headers = new HttpHeaders({ 'Content-type': 'application/json' });
    return this.http.post<any>(this.apiUrlRegister, data);
  }
  login(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrlLogin, data);
  }
   logOut(){
    localStorage.clear();
    this.router.navigate(['login'])
   }
}
