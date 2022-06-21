import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  private storage: SQLiteObject;
  cartItems: any = []
  total: number = 0

  constructor(
    private sqlite: SQLite,
    private platform: Platform,
    private router: Router,
  ) {

  }

   async ngOnInit() {
      //await this.createSqlLiteDB()
  }

  async ionViewDidEnter() {
    await this.createSqlLiteDB()
  }

  async createSqlLiteDB() {
    this.total = 0
    this.cartItems = []
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

  continue_shopping() {
    this.router.navigate(['/'])
  }

  removeCart(id) {
    return this.storage.executeSql('DELETE FROM add_to_cart WHERE id = ?', [id]).then(res => {
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

checkout() {
  this.router.navigate(['checkout'])
}




}
