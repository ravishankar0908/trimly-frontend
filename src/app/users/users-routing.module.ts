import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHeaderComponent } from './components/user-header/user-header.component';

const routes: Routes = [
  {
    path: '',
    component: UserHeaderComponent,
    children: [
      {
        path: 'shopdetails',
        loadChildren: () =>
          import('./shop-details/shop-details.module').then(
            (m) => m.ShopDetailsModule
          ),
      },

      {
        path: 'dashboard',
        loadChildren: () =>
          import('./user-dashboard/user-dashboard.module').then(
            (m) => m.UserDashboardModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./user-profile/user-profile.module').then(
            (m) => m.UserProfileModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
