import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColumnPageRoutingModule } from './column-routing.module';

import { ColumnPage } from './column.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColumnPageRoutingModule
  ],
  declarations: [ColumnPage]
})
export class ColumnPageModule {}
