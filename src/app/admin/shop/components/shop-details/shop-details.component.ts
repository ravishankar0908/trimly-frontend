import { Component, OnInit, ViewChild } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

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
    'created',
    'updated',
    'action',
  ];
  shopData: any[] = [];
  emptyCheck: boolean = false;
  pageLength: number = 0;
  length: number = 10;
  pageNumber: number = 1;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    this.getAllShopDetails();
  }

  private getAllShopDetails() {
    this.shopService.getAllshops(this.length, this.pageNumber).subscribe({
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
      this.pageLength = res.totalCount;
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

  onPaginatorEvent(event: PageEvent) {
    this.length = event.pageSize;
    this.pageNumber = event.pageIndex + 1;
    this.shopService.getAllshops(this.length, this.pageNumber).subscribe({
      next: (res) => {
        this.handleSuccess(res);
      },
      error: (err) => {
        this.handleError(err);
      },
    });
  }
}
