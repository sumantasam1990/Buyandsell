import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {

  public pass = {old: '', new: '', renew: ''}

  constructor(
    private loadingctrl: LoadingController,
    private http: HttpClient,
  ) { }

  ngOnInit() {
  }

  update() {
    this.presentLoading()
    const myheader = new HttpHeaders();
    //myheader.set('Access-Control-Allow-Origin', '*');
    myheader.set('Content-Type', 'application/x-www-form-urlencoded');

    const formData = new FormData();
    formData.append('pass', this.pass.old);
    formData.append('nwpass', this.pass.new);
    formData.append('renwpass', this.pass.renew);
    formData.append('UserIds', localStorage.getItem('u_id'));

     this.http.post<any>('https://buyandsell.click/api/changepasswordaction', formData, {
      headers: myheader
    }).subscribe(response => {

      this.loadingctrl.dismiss();

      alert(response.msg)


    });
  }

    async presentLoading() {
    const loading = await this.loadingctrl.create({
      cssClass: 'my-custom-class',
      message: 'Please wait... Do not close or minimize or back the app',
      duration: 8000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

}
