import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopDetailsRoutingModule } from './shop-details-routing.module';
import { ListShopComponent } from './components/list-shop/list-shop.component';


@NgModule({
  declarations: [
    ListShopComponent
  ],
  imports: [
    CommonModule,
    ShopDetailsRoutingModule
  ]
})
export class ShopDetailsModule { }
