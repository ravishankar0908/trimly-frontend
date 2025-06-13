import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
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
    private routerService: Router,
    private breakPoint: BreakpointObserver
  ) {}
  displayName: string | null = '';
  mode: 'side' | 'over' = 'side';
  opened: boolean = true;
  ngOnInit(): void {
    this.getScreenSize();
    this.displayName = this.authService.getRole();
  }

  private getScreenSize() {
    this.breakPoint.observe([Breakpoints.Large, Breakpoints.XLarge]).subscribe({
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
      localStorage.removeItem('role');
      this.routerService.navigate(['../auth/login']);
    });
  }
}
