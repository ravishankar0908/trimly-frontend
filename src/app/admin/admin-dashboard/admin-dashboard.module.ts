import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {
  CdkDrag,
  CdkDragPlaceholder,
  CdkDropList,
} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    CdkDrag,
    CdkDragPlaceholder,
    CdkDropList,
  ],
})
export class AdminDashboardModule {}
