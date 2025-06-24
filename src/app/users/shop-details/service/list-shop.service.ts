import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shopApi } from '../environments/listshop.environment';

@Injectable({
  providedIn: 'root',
})
export class ListShopService {
  constructor(private http: HttpClient) {}

  getShopDetails(): Observable<any> {
    return this.http.get(`${shopApi.Shop_Api}`, { withCredentials: true });
  }
}
