import { APP_ID, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { userDto } from '../dtos/user.dto';
import e from 'express';
import { isPlatformBrowser } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserStoreService } from './user-store-service.service';
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
    private userStorageService: UserStoreService
  ) {
    this.userDetail = this.decodedToken();
  }
  register(data: any): Observable<any> {
    // const headers = new HttpHeaders({ 'Content-type': 'application/json' });
    return this.http.post<any>(this.apiUrlRegister, data);
  }
  login(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrlLogin, data);
  }
  getUserDetail(token: string) {
    return this.http.post<any>(
      'http://localhost:8080/ShopBookPTD/api/v1/users/detail',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getAllAccount() {
    return this.http.get<any>(
      'http://localhost:8080/ShopBookPTD/api/v1/users/admin/users'
    );
  }

  getUserResponseFromLocalStorage(): userDto | null {
    try {
      // Retrieve the JSON string from local storage using the key
      const userResponseJSON = localStorage.getItem('user');
      if (userResponseJSON == null || userResponseJSON == undefined) {
        return null;
      }
      // Parse the JSON string back to an object
      const userResponse = JSON.parse(userResponseJSON!);
      console.log('User response retrieved from local storage.');
      return userResponse;
    } catch (error) {
      console.error(
        'Error retrieving user response from local storage:',
        error
      );
      return null; // Return null or handle the error as needed
    }
  }

  isAdmin(): Observable<string> {
    return this.userStorageService.getRoleFromStore();
  }
  saveTokenToStorage(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken();
    if (token) {
      return jwtHelper.decodeToken(token);
    }
  }

  getFullNameFromToken() {
    if (this.userDetail) {
      return this.userDetail.userName;
    }
    return null;
  }

  getRoleFromToken() {
    if (this.userDetail) {
      return this.userDetail.role;
    }
  }
}
