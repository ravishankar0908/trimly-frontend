import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userApi } from '../environments/users.environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  userApi: string = userApi.User_Api;
  getAllUsersDetail(itemsPerPage: number, pageNumber: number): Observable<any> {
    return this.http.get(
      `${this.userApi}/?itemsPerPage=${itemsPerPage}&pageNumber=${pageNumber}`,
      { withCredentials: true }
    );
  }
}
