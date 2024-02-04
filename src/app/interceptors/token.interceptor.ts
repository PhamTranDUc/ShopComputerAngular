import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core'; // Thêm Injectable từ @angular/core
import { UserService } from '../services/user.service';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}
  // Phương thức intercept nhận vào một request và một next handler
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Gọi hàm getToken trong UserService để lấy token
    const token = this.userService.getToken();

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(req);
  }
}
