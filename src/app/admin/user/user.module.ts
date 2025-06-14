import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersDetailComponent } from './components/users-detail/users-detail.component';
import { UserRoutingModule } from './user-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [UsersDetailComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
  ],
})
export class UserModule {}
