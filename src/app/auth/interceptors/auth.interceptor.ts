import { inject, Injectable, Injector } from '@angular/core';
import {
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpRequest,
  HttpClient,
} from '@angular/common/http';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { auth_environment } from '../environments/auth.environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private http: HttpClient) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url.includes('/refreshtoken')) {
      return next.handle(request);
    }

    const token = localStorage.getItem('jwtToken');
    if (token) {
      const isExpired = this.isTokenExpired(token);

      if (!isExpired) {
        const cloned = this.headerRequest(request, token);
        return next.handle(cloned);
      }
    }

    console.log('Attempting token refresh');
    return this.refreshToken().pipe(
      switchMap((res: any) => {
        console.log('Inside switchMap');
        const newToken = res.jwtToken;
        localStorage.setItem('jwtToken', newToken);
        const newRequest = this.headerRequest(request, newToken);
        return next.handle(newRequest);
      }),
      catchError((err) => {
        this.router.navigate(['/login']);
        return throwError(() => err);
      })
    );
  }

  private refreshToken(): Observable<any> {
    return this.http.post(
      `${auth_environment.Auth_Api}/refreshtoken`,
      {},
      {
        withCredentials: true,
      }
    );
  }

  isTokenExpired(token: string): boolean {
    try {
      const decode = jwtDecode(token);
      const currDate = Math.floor(Date.now() / 1000);
      return decode.exp ? decode.exp < currDate : true;
    } catch (error) {
      console.error('Token decode error:', error);
      return true;
    }
  }

  headerRequest(request: HttpRequest<unknown>, token: string) {
    const cloned = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
      withCredentials: true,
    });
    return cloned;
  }
}
