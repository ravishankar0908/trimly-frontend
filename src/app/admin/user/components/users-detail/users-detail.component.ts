import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/admin/components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.scss'],
})
export class UsersDetailComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
    private toaster: ToastrService
  ) {}
  pageLength: number = 0;
  displayedColumns: string[] = [
    'position',
    'firstName',
    'lastName',
    'email',
    'gender',
    'phone',
    'created',
    'modified',
    'action',
  ];
  userData: any[] = [];
  emptyCheck: boolean = false;
  itemsPerPage: number = 10;
  pageNumber: number = 1;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    this.getUserData();
  }

  private getUserData() {
    this.usersService
      .getAllUsersDetail(this.itemsPerPage, this.pageNumber)
      .subscribe({
        next: (res) => {
          this.handleSuccess(res);
        },
        error: (err) => {
          this.handleError(err);
        },
      });
  }

  private handleError(err: any) {
    const statusCode = [404];
    if (statusCode.includes(err.status)) {
      const length = this.isEmpty(err.error.data.length);

      if (length) {
        this.emptyCheck = true;
      }
    }
  }

  private handleSuccess(res: any) {
    const empty = this.isEmpty(res.data.length);
    this.pageLength = res.totalCount;
    if (empty) {
      this.emptyCheck = true;
      return;
    }
    this.userData = res.data;
  }

  editUser(id: any) {
    alert(id);
  }

  private isEmpty(row: number) {
    if (row === 0) {
      return true;
    }
    return false;
  }

  handlePaginator(event: PageEvent) {
    this.itemsPerPage = event.pageSize;
    this.pageNumber = event.pageIndex + 1;
    this.usersService
      .getAllUsersDetail(this.itemsPerPage, this.pageNumber)
      .subscribe({
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
        this.usersService.deleteUserById(id).subscribe({
          next: (res) => {
            this.toaster.success(res.message, 'deleted');
            this.getUserData();
          },
          error: (err) => {},
        });
      }
    });
  }
}
