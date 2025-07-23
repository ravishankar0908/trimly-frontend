import { Component, OnInit, ViewChild } from '@angular/core';
import { SpecializationService } from '../../service/specialization.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list-specialization',
  templateUrl: './list-specialization.component.html',
  styleUrls: ['./list-specialization.component.scss'],
})
export class ListSpecializationComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'description', 'action'];
  dataSource: any[] = [];
  isEmptyData: boolean = true;
  itemsPerPage: number = 5;
  pageNumber: number = 1;
  pageLength: number = 0;
  currentPageIndex: number = 0;
  constructor(private specializationService: SpecializationService) {}

  ngOnInit(): void {
    this.getAllSpecialization();
  }

  private getAllSpecialization() {
    this.specializationService
      .getSpecialization(this.itemsPerPage, this.pageNumber)
      .subscribe({
        next: (res) => {
          this.handleSuccess(res);
        },
        error: (err) => {},
      });
  }

  private handleSuccess(res: any) {
    this.dataSource = res.data;
    this.pageLength = res.totalCount;

    if (res.data.length === 0) {
      this.isEmptyData = true;
    } else {
      this.isEmptyData = false;
    }
  }

  refreshData() {
    this.getAllSpecialization();
  }

  handlePaginator(event: PageEvent) {
    this.itemsPerPage = event.pageSize;
    this.pageNumber = event.pageIndex + 1;
    this.currentPageIndex = event.pageIndex;

    this.specializationService
      .getSpecialization(this.itemsPerPage, this.pageNumber)
      .subscribe({
        next: (res) => {
          this.handleSuccess(res);
        },
        error: (err) => {},
      });
  }
}
