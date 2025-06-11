import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { ArrayDataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

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
    'status',
  ];
  userData: any[] = [];
  dataSource = new MatTableDataSource<any>(this.userData);
  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    debugger;
    this.usersService.getAllUsersDetail().subscribe(
      (res) => {
        this.userData = res.data;
      },
      (err) => {
        if (err.status === 404)
          this.toasterService.error(err.error.message, 'error');
      }
    );
  }
}
