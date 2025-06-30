import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StylistsRoutingModule } from './stylists-routing.module';
import { AddStylistComponent } from './components/add-stylist/add-stylist.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { AddSpecializationComponent } from './components/add-specialization/add-specialization.component';
import { MatButtonModule } from '@angular/material/button';
import { ListSpecializationComponent } from './components/list-specialization/list-specialization.component';
import { ListStylistsComponent } from './components/list-stylists/list-stylists.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AddStylistComponent,
    AddSpecializationComponent,
    ListSpecializationComponent,
    ListStylistsComponent,
  ],
  imports: [
    CommonModule,
    StylistsRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
})
export class StylistsModule {}
