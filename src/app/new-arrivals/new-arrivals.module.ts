import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewArrivalsComponent } from './new-arrivals.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [NewArrivalsComponent],
  exports: [NewArrivalsComponent]
})
export class NewArrivalsModule {}
