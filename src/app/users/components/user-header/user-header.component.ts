import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss'],
})
export class UserHeaderComponent {
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
