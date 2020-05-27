import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColumnsPageRoutingModule } from './columns-routing.module';

import { ColumnsPage } from './columns.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColumnsPageRoutingModule
  ],
  declarations: [ColumnsPage]
})
export class ColumnsPageModule {}
