import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { DomSanitizer } from '@angular/platform-browser'
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  private storage: SQLiteObject;

  prodId: string;
  url: string = 'https://buyandsell.click/api/buyandsell/productdetails/';
  ratingUrl: string = 'https://buyandsell.click/api/buyandsell/productratings/';
  imagesUrl: string = 'https://buyandsell.click/api/buyandsell/productimages/';


  slideOpts = {
    initialSlide: 0,
    speed: 400,
    // spaceBetween: 100,
    // slidesPerView: 2
    pagination: false,

  };

  prod_title: string;
  prod_long: any;
  prod_price: any;
  prod_condition: string;
  prod_quantity: number;
  prod_delivery_days: number;

  rating: string;
  product_images: any = []
  main_product_image: string


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private restApi: RestApiService,
    private loadingController: LoadingController,
    private sanitized: DomSanitizer,
    private sqlite: SQLite,
    private platform: Platform,
  ) { }

  async ngOnInit() {
    this.createSqlLiteDB()
    this.prodId = this.route.snapshot.paramMap.get('id')
    await this.presentLoadingWithOptions()
    await this.restApi.getData(this.url + this.prodId).then((res: any) => {
      this.prod_title = res.title
      this.prod_long = this.sanitized.bypassSecurityTrustHtml(res.long_desc)
      this.prod_price = res.price
      this.prod_condition = res.conditions
      this.prod_quantity = res.quantity
      this.prod_delivery_days = res.prod_delivery_days
      this.loadingController.dismiss()
    })

    this.getRating()
    this.getImages()
  }

  createSqlLiteDB() {
    this.platform.ready().then(() => {
      this.sqlite.create({
    name: 'buyandsell_cart.db',
    location: 'default'
  })
    .then((db: SQLiteObject) => {

      this.storage = db;

      db.executeSql('CREATE TABLE IF NOT EXISTS add_to_cart(id INTEGER PRIMARY KEY AUTOINCREMENT, prod_id TEXT NOT NULL, prod_name TEXT NOT NULL, prod_image TEXT NOT NULL, prod_quantity INTEGER NOT NULL, prod_price VARCHAR(100) NOT NULL)', [])
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log('error in sql query'));


    })
    .catch(e => alert('error in create db'));
    });

  }

  async getRating() {
    await this.restApi.getData(this.ratingUrl + this.prodId).then((res: any) => {
      this.rating = res.AverageRatings
    })
  }

    async getImages() {
    await this.restApi.getData(this.imagesUrl + this.prodId).then((res: any) => {
      this.product_images = res
      this.main_product_image = res[0].pro_img_path
    })
  }

  async addToCart() {
    let data = [this.prodId, this.prod_title, this.main_product_image, 1, this.prod_price];
    return await this.storage.executeSql('INSERT INTO add_to_cart (prod_id, prod_name, prod_image, prod_quantity, prod_price) VALUES (?, ?, ?, ?, ?)', data)
    .then(res => {
      this.router.navigate(['/cart'])
    }).catch(e => alert('error'));
  }



  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'circular',
      duration: 8000,
      message: 'loading...',
      translucent: false,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: false,
      showBackdrop: true,
    });
    await loading.present();
  }

}
