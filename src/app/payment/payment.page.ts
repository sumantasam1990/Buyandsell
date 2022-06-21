import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  StripeService,
  StripeCardComponent
} from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { LoadingController, ModalController, Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

    paymentForm: FormGroup;
  stripeCardValid: boolean = false;
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        lineHeight: '1.989',

        padding: '5px 10px 5px 10px',
        iconColor: '#000000',
        color: '#000000',
        fontWeight: 400,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#888888'
        }
      }
    }
  };

  get validForm() {
    return this.paymentForm.valid && this.stripeCardValid;
  }

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  private storage: SQLiteObject;
  cartItems: any = []
  total: number = 0
  //address: string

  @Input() address: string; // Component Props from checkout sheet modal

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private http: HttpClient,
    private router: Router,
    private sqlite: SQLite,
    private platform: Platform,
    private loadingctrl: LoadingController,
    private route: ActivatedRoute,
    private modalController: ModalController,
  ) { }

  async ngOnInit() {

    //this.address = this.route.snapshot.paramMap.get('address')


    this.paymentForm = this.fb.group({
      name: ['', [Validators.required]]
    });

    await this.createSqlLiteDB()
    //alert(this.address)
  }

  onChange({ type, event }) {
    if (type === 'change') {
      this.stripeCardValid = event.complete;
    }
  }

  buy() {
    this.presentLoading()
    this.stripeService
      .createToken(this.card.getCard(), { name: this.paymentForm.value.name })
      .subscribe(result => {
        if (result.token) {
          //console.log(result.token.id)
          const myheader = new HttpHeaders();
    //myheader.set('Access-Control-Allow-Origin', '*');
    myheader.set('Content-Type', 'application/x-www-form-urlencoded');

    const formData = new FormData();
    formData.append('name', localStorage.getItem('u_name'));
    formData.append('stripeToken', result.token.id);
    formData.append('amount', this.total.toString());
    formData.append('UserEmail', localStorage.getItem('u_email'));
    formData.append('UserID', localStorage.getItem('u_id'));
    formData.append('delvryadd', this.address);
    formData.append('cartItems', JSON.stringify(this.cartItems));

    //console.log(JSON.stringify(this.cartItems))

     this.http.post<any>('https://buyandsell.click/api/buyandsell/mobstripepay', formData, {
      headers: myheader
    }).subscribe(response => {
      this.loadingctrl.dismiss();
      if(response=='success') {
        this.removeAllCart()
        this.router.navigate(['placeordersuccess'])
      } else {
        this.router.navigate(['placeorderfailed'])
      }
      // if(response[0] == 'success') {

      //   alert('Order Placed')
      //   console.log(response[1])
      // } else {
      //   alert('Order failed. Please try again later.')
      // }


    });
         // console.log(result.token);
        } else if (result.error) {
          console.log(result.error.message);
        }
      });
  }

   setPost(token: any) {
     const myheader = new HttpHeaders();
    myheader.set('Access-Control-Allow-Origin', '*');
    myheader.set('Content-Type', 'application/x-www-form-urlencoded');

    const formData = new FormData();
    formData.append('name', 'Sumanta Kundu');
    formData.append('stripeToken', token.id);
    formData.append('amount', this.total.toString());
    formData.append('UserEmail', 'sumantasam1990@gmail.com');
    formData.append('UserID', '1');
    formData.append('delvryadd', "Sodepur,Kolkata,WB-700110,Australia,Contact no: 8240048536,E-mail: bikram@wwwwmedia.world");
    formData.append('cartItems', this.cartItems);

     this.http.post<any>('https://buyandsell.click/mobstripepay', formData, {
      headers: myheader
    }).subscribe(response => {
      console.log(response)
      // if(response[0] == 'success') {

      //   alert('Order Placed')
      //   console.log(response[1])
      // } else {
      //   alert('Order failed. Please try again later.')
      // }


    });
  }

  //Sqllite
  async createSqlLiteDB() {
    await this.platform.ready().then(() => {
      this.sqlite.create({
    name: 'buyandsell_cart.db',
    location: 'default'
  })
    .then((db: SQLiteObject) => {

      this.storage = db;

      db.executeSql('SELECT * FROM add_to_cart', []).then(res => {
      for (let i = 0; i < res.rows.length; i++) {

          const row = res.rows.item(i);
          this.total += parseFloat(row.prod_price)
          this.cartItems.push({
            id: row.id,
            prod_id: row.prod_id,
            prod_name: row.prod_name,
            prod_image: row.prod_image,
            prod_quantity: row.prod_quantity,
            prod_price: row.prod_price
          });
        }
      //alert(res.rows.length)
    }).catch(e => alert('error'));




    })
    .catch(e => alert('eror db'));
    });

  }

  async removeCart(id) {
    return await this.storage.executeSql('DELETE FROM add_to_cart WHERE id = ?', [id]).then(res => {
      this.storage.executeSql('SELECT * FROM add_to_cart', []).then(res => {
        this.cartItems = []
        this.total = 0
      for (let i = 0; i < res.rows.length; i++) {

          const row = res.rows.item(i);
          this.total += parseFloat(row.prod_price)
          this.cartItems.push({
            id: row.id,
            prod_id: row.prod_id,
            prod_name: row.prod_name,
            prod_image: row.prod_image,
            prod_quantity: row.prod_quantity,
            prod_price: row.prod_price
          });
        }
      //alert(res.rows.length)
    }).catch(e => alert('error'))
    }).catch(e => alert('error'))
  }

  async removeAllCart() {
    return await this.storage.executeSql('DELETE FROM add_to_cart', []).then(res => {
      this.storage.executeSql('SELECT * FROM add_to_cart', []).then(res => {
        this.cartItems = []
        this.total = 0
      for (let i = 0; i < res.rows.length; i++) {

          const row = res.rows.item(i);
          this.total += parseFloat(row.prod_price)
          this.cartItems.push({
            id: row.id,
            prod_id: row.prod_id,
            prod_name: row.prod_name,
            prod_image: row.prod_image,
            prod_quantity: row.prod_quantity,
            prod_price: row.prod_price
          });
        }
      //alert(res.rows.length)
    }).catch(e => alert('error'))
    }).catch(e => alert('error'))
  }

  async presentLoading() {
    const loading = await this.loadingctrl.create({
      cssClass: 'my-custom-class',
      message: 'Please wait... Do not close or minimize or back the app',
      duration: 40000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
