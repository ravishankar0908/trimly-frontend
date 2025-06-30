import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopsRoutingModule } from './shops-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [HeaderComponent, SidebarComponent],
  imports: [
    CommonModule,
    ShopsRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
  ],
})
export class ShopsModule {}
