import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.scss'],
})
export class UsersDetailComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private toasterService: ToastrService
  ) {}
  displayedColumns: string[] = [
    'position',
    'firstName',
    'lastName',
    'email',
    'gender',
    'phone',
    'action',
  ];
  userData: any[] = [];
  emptyCheck: boolean = false;
  ngOnInit(): void {
    this.getUserData();
  }

  private getUserData() {
    this.usersService.getAllUsersDetail().subscribe(
      (res) => {
        this.handleSuccess(res);
      },
      (err) => {
        this.handleError(err);
      }
    );
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
    if (empty) {
      this.emptyCheck = true;
      return;
    }
    this.userData = res.data;
  }

  editUser(id: any) {
    alert(id);
  }

  deleteUser(id: any) {
    alert(id);
  }

  private isEmpty(row: number) {
    if (row === 0) {
      return true;
    }
    return false;
  }
}
