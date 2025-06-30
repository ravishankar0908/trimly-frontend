import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
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
  opened: boolean = true;
  mode: 'side' | 'over' = 'side';

  constructor(
    private authService: AuthService,
    private toasterService: ToastrService,
    private routerService: Router,
    private breakpoint: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.getScreenSize();
  }

  private getScreenSize() {
    this.breakpoint.observe([Breakpoints.Large, Breakpoints.XLarge]).subscribe({
      next: (res) => {
        this.handleSuccess(res);
      },
    });
  }

  private handleSuccess(res: any) {
    if (res.matches) {
      this.opened = true;
      this.mode = 'side';
    } else {
      this.opened = false;
      this.mode = 'over';
    }
  }

  logout() {
    this.authService.logout().subscribe((res) => {
      this.toasterService.success(res.message, 'success');
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('id');
      this.routerService.navigate(['../auth/login']);
    });
  }
}
