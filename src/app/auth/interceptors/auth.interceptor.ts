import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('jwtToken');
    if (token && !this.isTokenExpired(token)) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
        withCredentials: true,
      });

      return next.handle(cloned);
    } else {
      return next.handle(request);
    }
  }

  isTokenExpired(token: string): any {
    try {
      const decode = jwtDecode(token);
      const currDate = Math.floor(Date.now() / 1000);
      if (decode.exp) return decode.exp < currDate;
    } catch (error) {
      return error;
    }
  }
}
