import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListShopComponent } from './components/list-shop/list-shop.component';

const routes: Routes = [
  {
    path: '',
    component: ListShopComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopDetailsRoutingModule {}
