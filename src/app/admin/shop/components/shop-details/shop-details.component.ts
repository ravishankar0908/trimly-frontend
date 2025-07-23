import { Component, OnInit, ViewChild } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/admin/components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.scss'],
})
export class ShopDetailsComponent implements OnInit {
  constructor(
    private shopService: ShopService,
    private toasterService: ToastrService,
    private dialog: MatDialog
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

  openDeleteDialog(id: any) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      height: '170px',
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.shopService.deleteShopById(id).subscribe({
          next: (res) => {
            this.toasterService.success(res.message, 'Deleted');
            this.getAllShopDetails();
          },
          error: (err) => {},
        });
      }
    });
  }
}
