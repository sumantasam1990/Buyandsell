import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentPageRoutingModule } from './payment-routing.module';

import { PaymentPage } from './payment.page';
import { NgxStripeModule } from 'ngx-stripe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot('pk_test_51IOaN8JIlVvxjrBSWzczcNgsEKmvJ37qWjEjcjZVWKaeUVyqzk2LnYJnbZoJBae8eCIZuc2YPqKDvflyXLYJfjvq0051nQ2cil'),
  ],
  declarations: [PaymentPage]
})
export class PaymentPageModule {}
