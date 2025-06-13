import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

export const userAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toasterService = inject(ToastrService);
  const authService = inject(AuthService);
  const token = localStorage.getItem('jwtToken');
  const role = authService.getRole();

  if (token && role === 'user') {
    return true;
  } else {
    toasterService.warning('Unauthorized!', 'warning');
    return router.createUrlTree(['auth/login']);
  }
};
