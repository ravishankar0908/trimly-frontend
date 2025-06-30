import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStylistComponent } from './components/add-stylist/add-stylist.component';
import { AddSpecializationComponent } from './components/add-specialization/add-specialization.component';

const routes: Routes = [
  {
    path: '',
    component: AddStylistComponent,
  },
  {
    path: 'specialization',
    component: AddSpecializationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StylistsRoutingModule {}
