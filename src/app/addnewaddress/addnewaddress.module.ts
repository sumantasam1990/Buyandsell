import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddnewaddressPageRoutingModule } from './addnewaddress-routing.module';

import { AddnewaddressPage } from './addnewaddress.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddnewaddressPageRoutingModule
  ],
  declarations: [AddnewaddressPage]
})
export class AddnewaddressPageModule {}
