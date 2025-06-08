import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegistrationModel } from '../models/user.registration.model';
import { auth_environment } from '../environments/auth.environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  Auth_Api = auth_environment.Auth_Api;
  Registration(userValues: UserRegistrationModel): Observable<any> {
    return this.http.post(`${this.Auth_Api}/registration`, userValues);
  }
}
