import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { StylistService } from '../../service/stylist.service';

@Component({
  selector: 'app-list-stylists',
  templateUrl: './list-stylists.component.html',
  styleUrls: ['./list-stylists.component.scss'],
})
export class ListStylistsComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'gender',
    'dateofbirth',
    'experience',
    'level',
    'specialization',
    'action',
  ];
  isEmptyData: boolean = true;
  dataSource: string[] = [];
  itemsPerPage: number = 10;
  pageNumber: number = 1;
  currentPageIndex: number = 0;
  pageLength: number = 0;
  constructor(private stylistService: StylistService) {}

  ngOnInit(): void {
    this.getStylistData();
  }

  getStylistData() {
    this.stylistService
      .getStylist(this.itemsPerPage, this.pageNumber)
      .subscribe({
        next: (res) => {
          this.handleSuccess(res);
        },
        error: (err) => {},
      });
  }

  handlePaginator(event: PageEvent) {
    this.itemsPerPage = event.pageSize;
    this.pageNumber = event.pageIndex + 1;
    this.currentPageIndex = event.pageIndex;

    this.stylistService
      .getStylist(this.itemsPerPage, this.pageNumber)
      .subscribe({
        next: (res) => {
          this.handleSuccess(res);
        },
        error: (err) => {},
      });
  }

  handleSuccess(res: any) {
    this.dataSource = res.data;
    this.pageLength = res.totalCount;

    if (this.pageLength > 0) {
      this.isEmptyData = false;
    }
  }
}
