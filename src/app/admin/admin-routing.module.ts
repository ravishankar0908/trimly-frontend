import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./admin-dashboard/admin-dashboard.module').then(
            (m) => m.AdminDashboardModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./admin-profile/admin-profile.module').then(
            (m) => m.AdminProfileModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
