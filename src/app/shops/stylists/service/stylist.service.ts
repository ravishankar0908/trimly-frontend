import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stylist } from '../environment/stylist.environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StylistService {
  constructor(private http: HttpClient) {}

  api = stylist.api;
  id = localStorage.getItem('id');
  insertStylist(stylistData: any): Observable<any> {
    return this.http.post(
      `${this.api}/add-stylist?userId=${this.id}`,
      stylistData,
      { withCredentials: true }
    );
  }

  getStylist(itemsPerPage: any, pageNumber: any): Observable<any> {
    return this.http.get(
      `${this.api}/?userId=${this.id}&itemsPerPage=${itemsPerPage}&pageNumber=${pageNumber}`,
      {
        withCredentials: true,
      }
    );
  }
}
