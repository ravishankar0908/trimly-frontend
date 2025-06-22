import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.scss'],
})
export class ShopDetailsComponent implements OnInit {
  constructor(
    private shopService: ShopService,
    private toasterService: ToastrService
  ) {}
  columnsToDisplay: string[] = [
    'index',
    'shopname',
    'shopemail',
    'shopcity',
    'action',
  ];
  shopData: [] = [];
  emptyCheck: boolean = false;

  ngOnInit(): void {
    this.getAllShopDetails();
  }

  private getAllShopDetails() {
    this.shopService.getAllshops().subscribe({
      next: (res) => {
        this.handleSuccess(res);
      },
      error: (err) => {
        this.handleError(err);
      },
    });
  }

  private handleSuccess(res: any) {
    if (res) {
      console.log(res.data.length);

      const empty = this.isEmpty(res.data.length);
      if (empty) {
        this.emptyCheck = true;
        return;
      }
      this.shopData = res.data;
    }
  }

  private handleError(err: any) {
    const statusCode = [404, 500];

    if (statusCode.includes(err.status)) {
      this.toasterService.error(err.error.message, 'error');
    }
  }

  private isEmpty(length: number) {
    if (length === 0) {
      return true;
    }
    return false;
  }

  editShop(id: any) {
    alert(id);
  }
}
