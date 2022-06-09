import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SlidingcategoryComponent } from './slidingcategory.component';



@NgModule({
  declarations: [SlidingcategoryComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    SlidingcategoryComponent
  ]
})
export class SlidingcategoryModule { }
