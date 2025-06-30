import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';
import { userAuthGuard } from './auth/guards/users/user-auth.guard';
import { shopGuard } from './auth/guards/shops/shop.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },

  {
    path: 'users',
    canActivate: [userAuthGuard],
    canActivateChild: [userAuthGuard],
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },

  {
    path: 'shops',
    canActivate: [shopGuard],
    canActivateChild: [shopGuard],
    loadChildren: () =>
      import('./shops/shops.module').then((m) => m.ShopsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
