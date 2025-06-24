import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopDetailsRoutingModule } from './shop-details-routing.module';
import { ListShopComponent } from './components/list-shop/list-shop.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [ListShopComponent],
  imports: [
    CommonModule,
    ShopDetailsRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatTooltipModule,
  ],
})
export class ShopDetailsModule {}
