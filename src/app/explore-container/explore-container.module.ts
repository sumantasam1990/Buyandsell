import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponent } from './explore-container.component';
import { NewArrivalsModule } from '../new-arrivals/new-arrivals.module';
import { CtaModule } from '../cta/cta.module';
import { RecomendationModule } from '../recomendation/recomendation.module';
import { SlidingcategoryModule } from '../slidingcategory/slidingcategory.module';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, NewArrivalsModule, CtaModule, RecomendationModule, SlidingcategoryModule,  ],
  declarations: [ExploreContainerComponent],
  exports: [ExploreContainerComponent]
})
export class ExploreContainerComponentModule {}
