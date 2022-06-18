import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

    public sign = {email: '', pass: '', repass: '', name: ''}

  constructor(
    private navctrl: NavController,
    private http: HttpClient,
    private loadingctrl: LoadingController,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  login() {
    this.navctrl.navigateBack('login')
  }

  signup() {
    this.presentLoading()
    const myheader = new HttpHeaders();
    //myheader.set('Access-Control-Allow-Origin', '*');
    myheader.set('Content-Type', 'application/x-www-form-urlencoded');

    const formData = new FormData();
    formData.append('email', this.sign.email);
    formData.append('password', this.sign.pass);
    formData.append('repassword', this.sign.repass);
    formData.append('name', this.sign.name);

     this.http.post<any>('https://buyandsell.click/api/buyersignupaction', formData, {
      headers: myheader
    }).subscribe(response => {
      this.loadingctrl.dismiss();
      alert(response.msg)
      this.router.navigate(['login'])



    });
  }

   async presentLoading() {
    const loading = await this.loadingctrl.create({
      cssClass: 'my-custom-class',
      message: 'Please wait... Do not close or minimize or back the app',
      duration: 16000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

}
