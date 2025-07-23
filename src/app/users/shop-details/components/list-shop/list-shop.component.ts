import { Component, OnInit } from '@angular/core';
import { ListShopService } from '../../service/list-shop.service';
import { MatDialog } from '@angular/material/dialog';
import { BookDialogComponent } from '../book-dialog/book-dialog.component';

@Component({
  selector: 'app-list-shop',
  templateUrl: './list-shop.component.html',
  styleUrls: ['./list-shop.component.scss'],
})
export class ListShopComponent implements OnInit {
  constructor(private shopService: ListShopService, public dialog: MatDialog) {}
  shopDetails: any[] = [];
  stylistDetails: any[] = [];
  isEmpty: boolean = false;
  ngOnInit(): void {
    this.getShopDetails();
  }

  private getShopDetails() {
    this.shopService.shopsWithStylist().subscribe({
      next: (res) => {
        this.handleSuccess(res);
      },
      error: (err) => {
        this.handleError(err);
      },
    });
  }

  getStylistDetails(id: any) {
    this.shopService.getShopandStylist(id).subscribe({
      next: (res) => {
        this.stylistDetails = res.data;
      },
      error: (err) => {
        this.handleError(err);
      },
    });
  }

  private handleSuccess(res: any) {
    this.shopDetails = res.data;
    if (res.data.length === 0) {
      this.isEmpty = true;
    } else {
      this.getStylistDetails(this.shopDetails[0].shop._id);
    }
  }

  bookStylist(stylist: any) {
    const dialogRef = this.dialog.open(BookDialogComponent, {
      width: '400px',
      data: {
        id: stylist._id,
        name: stylist.name,
      },
      disableClose: true,
    });
  }

  private handleError(err: any) {}
}
