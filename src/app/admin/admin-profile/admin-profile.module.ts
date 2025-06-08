import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminProfileRoutingModule } from './admin-profile-routing.module';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    AdminProfileRoutingModule
  ]
})
export class AdminProfileModule { }
