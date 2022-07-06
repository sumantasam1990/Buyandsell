import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentPageRoutingModule } from './payment-routing.module';

import { PaymentPage } from './payment.page';
import { NgxStripeModule } from 'ngx-stripe';

import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot(environment.publishable_key),
  ],
  declarations: [PaymentPage]
})
export class PaymentPageModule {}
