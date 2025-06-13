import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { ToastrService } from 'ngx-toastr';

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

  data: [] | string = [];
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
    if (!res) {
      this.data = 'no content';
    } else {
      this.data = res.data;
    }
  }

  private handleError(err: any) {
    const statusCode = [404, 500];
    if (statusCode.includes(err.status)) {
      this.toasterService.error(err.error.message, 'error');
    }
  }
}
