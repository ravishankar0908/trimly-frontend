import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpecializationService {
  constructor(private http: HttpClient) {}
  api = 'http://localhost:3000/specialization/add';

  insertSpecialization(data: any): Observable<any> {
    return this.http.post(
      `${this.api}?userId=${localStorage.getItem('id')}`,
      data,
      { withCredentials: true }
    );
  }
}
