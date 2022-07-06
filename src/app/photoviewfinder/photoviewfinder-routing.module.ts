import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoviewfinderPage } from './photoviewfinder.page';

const routes: Routes = [
  {
    path: '',
    component: PhotoviewfinderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhotoviewfinderPageRoutingModule {}
