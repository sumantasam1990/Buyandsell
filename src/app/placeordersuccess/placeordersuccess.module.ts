import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaceordersuccessPageRoutingModule } from './placeordersuccess-routing.module';

import { PlaceordersuccessPage } from './placeordersuccess.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaceordersuccessPageRoutingModule
  ],
  declarations: [PlaceordersuccessPage]
})
export class PlaceordersuccessPageModule {}
