import { Component, OnInit, ViewChild } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { LoadingController, ModalController, Platform, IonRouterOutlet } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';
import { PaymentPage } from '../payment/payment.page';
import { LoginPage } from '../login/login.page';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  private storage: SQLiteObject;
  cartItems: any = []
  total: number = 0
  private url: string = 'https://buyandsell.click/api/buyandsell/buyeraddressess/'
  addressess: any = []
  public add = {txt: ''}
  private uid: string;
  public address: any;


  constructor(
    private sqlite: SQLite,
    private platform: Platform,
    private fb: FormBuilder,
    private router: Router,
    private loading: LoadingController,
    private restApi: RestApiService,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,

  ) {

  }

  async ngOnInit() {
    this.uid = localStorage.getItem('u_id')
      await this.createSqlLiteDB()
      // await this.restApi.getData(this.url + this.uid).then(res => {
      //   this.addressess = res

      // })

  }

  async ionViewDidEnter() {
    await this.restApi.getData(this.url + this.uid).then(res => {
        this.addressess = res
      })
  }



  async place_order() {

    const modal = await this.modalController.create({
    component: PaymentPage,
    cssClass: 'my-custom-class',
    initialBreakpoint: 0.6,
    breakpoints: [0, 0.6],
    swipeToClose: false,
    //presentingElement: this.routerOutlet.nativeEl,
    componentProps: {
      'address': this.address

    }
  });

    if(this.address != undefined) {
      return await modal.present();
    } else {
      alert("Please choose your delivery address first.")
    }

    //this.router.navigate(['payment', this.address])
  }



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


  selectAddress(str: any) {
    alert(str)
  }

  addnewaddress() {
    this.router.navigate(['addnewaddress'])
  }



}
