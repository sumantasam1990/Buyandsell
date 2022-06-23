import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar } from '@capacitor/status-bar';
import { AlertController, IonRouterOutlet, ModalController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { SearchPage } from '../search/search.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild("header") header: HTMLElement;

    slideOpts = {
    initialSlide: 0,
    speed: 400,
    //spaceBetween: 2,
    slidesPerView: 6
  };

  url: string = 'https://buyandsell.click/api/buyandsell/category';
  categories: any = [];

  count: number = 0
  countId: any = 0

  constructor(
    public element: ElementRef,
    public renderer: Renderer2,
    private router: Router,
    private restApi: RestApiService,
    private alertController: AlertController,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,

  ) {}

  async ngOnInit() {
      await this.restApi.getData(this.url).then(res => {
      this.categories = res;
    })
  }

  ionViewWillEnter() {
    this.renderer.setStyle(this.header['el'], 'webkitTransition', 'top 900ms');
  }

  onContentScroll(event) {
    if (event.detail.scrollTop >= 140 && event.detail.deltaY > 0) {
      this.renderer.setStyle(this.header['el'], 'top', '-300px');
      StatusBar.hide()
    } else {
      this.renderer.setStyle(this.header['el'], 'top', '0px');

    }

    if(event.detail.scrollTop == 0) {
      StatusBar.show()
    }
  }

  doRefresh(event) {
    //this.router.navigate([''])

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['']);
    });


    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  product_list(id,name) {
    this.presentAlertConfirm(id,name)


  }

  async presentAlertConfirm(id,name) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: name,
      message: 'Want to see products of this category?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          id: 'confirm-button',
          handler: () => {
            this.router.navigate(['productlist', id])
          }
        }
      ]
    });

    await alert.present();
  }

  async search() {
    this.router.navigate(['search'])
  }

}
