import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  url: string = 'https://buyandsell.click/api/buyandsell/category';
  categories: any = []

  constructor(
    private navctrl: NavController,
    private restApi: RestApiService,
    private router: Router,
    private loadingctrl: LoadingController,
    private alertController: AlertController,
  ) {}

  async ngOnInit() {
    this.presentLoading()
    await this.restApi.getData(this.url).then(res => {
      this.loadingctrl.dismiss()
      this.categories = res
    })
  }

  product_list(id) {
    if(id == 38) {
      this.presentAlertPrompt(id)
    } else {
      this.router.navigate(['productlist', id])
    }

  }

  async presentLoading() {
    const loading = await this.loadingctrl.create({
      cssClass: 'my-custom-class',
      message: 'loading... Do not close or minimize or back the app',
      duration: 40000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }




  async presentAlertPrompt(id) {
    const alert = await this.alertController.create({
      cssClass: 'buttonCss',
      header: 'Warning!',
      message: 'Are you 18+ ?',
      backdropDismiss: false,

      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            //console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.router.navigate(['productlist', id])
          }
        }
      ]
    });

    await alert.present();
  }

}
