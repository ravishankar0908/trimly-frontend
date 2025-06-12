import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private toasterService: ToastrService,
    private routerService: Router
  ) {}
  displayName: string | null = '';
  ngOnInit(): void {
    this.displayName = this.authService.getRole();
  }

  logout() {
    this.authService.logout().subscribe((res) => {
      this.toasterService.success(res.message, 'success');
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('role');
      this.routerService.navigate(['../auth/login']);
    });
  }
}
