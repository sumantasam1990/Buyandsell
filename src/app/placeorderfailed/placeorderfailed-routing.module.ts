import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaceorderfailedPage } from './placeorderfailed.page';

const routes: Routes = [
  {
    path: '',
    component: PlaceorderfailedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaceorderfailedPageRoutingModule {}
