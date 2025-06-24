import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shopApi } from '../environment/shop.environment';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private http: HttpClient) {}

  shopApi = shopApi.Shop_Api;

  getAllshops(length: number, pageNumber: number): Observable<any> {
    console.log(length, pageNumber);

    return this.http.get(
      `${this.shopApi}/?pageNumber=${pageNumber}&itemsPerPage=${length}`,
      {
        withCredentials: true,
      }
    );
  }
}
