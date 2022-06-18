import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaceorderfailedPageRoutingModule } from './placeorderfailed-routing.module';

import { PlaceorderfailedPage } from './placeorderfailed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaceorderfailedPageRoutingModule
  ],
  declarations: [PlaceorderfailedPage]
})
export class PlaceorderfailedPageModule {}
