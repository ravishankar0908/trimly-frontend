import { Component, OnInit } from '@angular/core';
import { ListShopService } from '../../service/list-shop.service';

@Component({
  selector: 'app-list-shop',
  templateUrl: './list-shop.component.html',
  styleUrls: ['./list-shop.component.scss'],
})
export class ListShopComponent implements OnInit {
  constructor(private shopService: ListShopService) {}
  shopDetails: any[] = [];
  ngOnInit(): void {
    this.getShopDetails();
  }

  private getShopDetails() {
    this.shopService.getShopDetails().subscribe({
      next: (res) => {
        this.handleSuccess(res);
      },
      error: (err) => {
        this.handleError(err);
      },
    });
  }

  private handleSuccess(res: any) {
    this.shopDetails = res.data;
    console.log(res);
  }

  private handleError(err: any) {}
}
