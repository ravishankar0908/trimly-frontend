import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shopAndStylist, shopApi } from '../environments/listshop.environment';

@Injectable({
  providedIn: 'root',
})
export class ListShopService {
  constructor(private http: HttpClient) {}
  id = localStorage.getItem('id');
  getShopDetails(): Observable<any> {
    return this.http.get(`${shopApi.Shop_Api}`, { withCredentials: true });
  }

  shopsWithStylist(): Observable<any> {
    return this.http.get(
      `${shopAndStylist.Api}/shopswithstylist?userId=${this.id}`,
      { withCredentials: true }
    );
  }

  getShopandStylist(shopId: any): Observable<any> {
    return this.http.get(
      `${shopAndStylist.Api}/shopandstylist?userId=${this.id}&shopId=${shopId}`,
      { withCredentials: true }
    );
  }
}
