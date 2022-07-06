import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhotoviewfinderPageRoutingModule } from './photoviewfinder-routing.module';

import { PhotoviewfinderPage } from './photoviewfinder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhotoviewfinderPageRoutingModule
  ],
  declarations: [PhotoviewfinderPage]
})
export class PhotoviewfinderPageModule {}
