import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpecializationService {
  constructor(private http: HttpClient) {}
  api = 'http://localhost:3000/specialization';

  id = localStorage.getItem('id');
  insertSpecialization(data: any): Observable<any> {
    return this.http.post(`${this.api}/add?userId=${this.id}`, data, {
      withCredentials: true,
    });
  }

  getSpecialization(itemsPerPage: number, pageNumber: number): Observable<any> {
    return this.http.get(
      `${this.api}/?userId=${this.id}&pageNumber=${pageNumber}&itemsPerPage=${itemsPerPage}`,
      {
        withCredentials: true,
      }
    );
  }

  getListSpecialization(): Observable<any> {
    return this.http.get(`${this.api}/?userId=${this.id}`, {
      withCredentials: true,
    });
  }
}
