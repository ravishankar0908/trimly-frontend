import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toasterService = inject(ToastrService);
  const token = localStorage.getItem('jwtToken');
  const role = localStorage.getItem('role');

  if (token && role === 'admin') {
    return true;
  } else {
    toasterService.warning('Unauthorized!', 'warning');
    return router.createUrlTree(['auth/login']);
  }
};
