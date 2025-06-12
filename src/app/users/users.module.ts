import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserHeaderComponent } from './components/user-header/user-header.component';
import { UserSidebarComponent } from './components/user-sidebar/user-sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [UserHeaderComponent, UserSidebarComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
  ],
})
export class UsersModule {}
