import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RecomendationComponent } from './recomendation.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [RecomendationComponent],
  exports: [RecomendationComponent]
})
export class RecomendationModule { }
