import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, NavController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.page.html',
  styleUrls: ['./productlist.page.scss'],
})
export class ProductlistPage implements OnInit {

  categoryid: string;
  url: string = 'https://buyandsell.click/api/buyandsell/catproducts/'
  products: any = []

  count : number = 0;


  constructor(
    private actionSheetController: ActionSheetController,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router,
    private restApi: RestApiService,
  ) { }

  async ngOnInit() {
    this.categoryid = this.route.snapshot.paramMap.get('id')

    this.restApi.getData(this.url + this.categoryid).then(res => {
      this.products = res[0]

    })

  }

  product(id) {
    this.router.navigate(['product', id])
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Sort by',
      cssClass: 'my-custom-class',
      buttons: [
      {
        text: 'High to Low',
        icon: 'card',
        data: 10,
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Low to High',
        icon: 'card',
        data: 'Data value',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Popularity',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }


tapEvent(){
this.count++;
setTimeout(() => {
  if (this.count == 1) {
    //this.count = 0;
    alert('Title');
  }if(this.count == 2){
    this.count = 0;
    alert('go to product page');
  }
}, 250);
}

}
