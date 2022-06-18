import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaceordersuccessPage } from './placeordersuccess.page';

const routes: Routes = [
  {
    path: '',
    component: PlaceordersuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaceordersuccessPageRoutingModule {}
