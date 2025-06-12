import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegistrationModel } from '../models/user.registration.model';
import { auth_environment } from '../environments/auth.environment';
import { Observable, tap, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  Auth_Api = auth_environment.Auth_Api;
  Registration(userValues: UserRegistrationModel): Observable<any> {
    return this.http.post(`${this.Auth_Api}/registration`, userValues);
  }

  login(loginCredentials: any): Observable<any> {
    return this.http.post(`${this.Auth_Api}/login`, loginCredentials, {
      withCredentials: true,
    });
  }

  getRole(): string | null {
    const token = localStorage.getItem('jwtToken');
    if (!token) return null;
    const decoded: any = jwtDecode(token);
    return decoded.role;
  }

  logout(): Observable<any> {
    return this.http.post(
      `${this.Auth_Api}/logout`,
      {},
      { withCredentials: true }
    );
  }
}
