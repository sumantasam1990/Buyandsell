import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-addnewaddress',
  templateUrl: './addnewaddress.page.html',
  styleUrls: ['./addnewaddress.page.scss'],
})
export class AddnewaddressPage implements OnInit {

  public sign = {phone: '', email: '', address: '', country: '', city: '', state: '', postcode: ''}

  constructor(
    private http: HttpClient,
    private loadingctrl: LoadingController,
  ) { }

  ngOnInit() {
  }

  add() {
    this.presentLoading()
    const myheader = new HttpHeaders();
    //myheader.set('Access-Control-Allow-Origin', '*');
    myheader.set('Content-Type', 'application/x-www-form-urlencoded');

    const formData = new FormData();
    formData.append('phn_no', this.sign.phone);
    formData.append('email', this.sign.email);
    formData.append('address', this.sign.address);
    formData.append('country', this.sign.country);
    formData.append('city', this.sign.city);
    formData.append('state', this.sign.state);
    formData.append('postcode', this.sign.postcode);
    formData.append('buyer_id', localStorage.getItem('u_id'));

     this.http.post<any>('https://buyandsell.click/api/addaddress', formData, {
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
