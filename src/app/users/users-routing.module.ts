import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHeaderComponent } from './components/user-header/user-header.component';

const routes: Routes = [
  {
    path: '',
    component: UserHeaderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
