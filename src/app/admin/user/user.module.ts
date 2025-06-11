import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersDetailComponent } from './components/users-detail/users-detail.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [UsersDetailComponent],
  imports: [CommonModule, UserRoutingModule],
})
export class UserModule {}
