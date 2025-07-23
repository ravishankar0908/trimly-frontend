import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { stylist } from '../environment/stylist.environment';

@Injectable({
  providedIn: 'root',
})
export class SpecializationService {
  constructor(private http: HttpClient) {}
  api = stylist.api;

  id = localStorage.getItem('id');
  insertSpecialization(data: any): Observable<any> {
    return this.http.post(
      `${this.api}/add-specialization?userId=${this.id}`,
      data,
      {
        withCredentials: true,
      }
    );
  }

  getSpecialization(itemsPerPage: number, pageNumber: number): Observable<any> {
    return this.http.get(
      `${this.api}/specialization?userId=${this.id}&pageNumber=${pageNumber}&itemsPerPage=${itemsPerPage}`,
      {
        withCredentials: true,
      }
    );
  }

  getListSpecialization(): Observable<any> {
    return this.http.get(`${this.api}/specialization/?userId=${this.id}`, {
      withCredentials: true,
    });
  }
}
