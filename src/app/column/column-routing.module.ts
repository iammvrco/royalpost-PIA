import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColumnPage } from './column.page';

const routes: Routes = [
  {
    path: '',
    component: ColumnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColumnPageRoutingModule {}
