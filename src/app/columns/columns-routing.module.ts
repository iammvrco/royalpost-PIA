import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColumnsPage } from './columns.page';

const routes: Routes = [
  {
    path: '',
    component: ColumnsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColumnsPageRoutingModule {}
