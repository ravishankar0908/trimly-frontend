import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopDetailsRoutingModule } from './shop-details-routing.module';
import { ListShopComponent } from './components/list-shop/list-shop.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { BookDialogComponent } from './components/book-dialog/book-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MatSelectModule } from '@angular/material/select';
@NgModule({
  declarations: [ListShopComponent, BookDialogComponent],
  imports: [
    CommonModule,
    ShopDetailsRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatTooltipModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
  ],
})
export class ShopDetailsModule {}
