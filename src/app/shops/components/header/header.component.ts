import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  opened: boolean = true;
  mode: 'side' | 'over' = 'side';

  constructor(
    private authService: AuthService,
    private toasterService: ToastrService,
    private routerService: Router
  ) {}

  logout() {
    this.authService.logout().subscribe((res) => {
      this.toasterService.success(res.message, 'success');
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('role');
      this.routerService.navigate(['../auth/login']);
    });
  }
}
