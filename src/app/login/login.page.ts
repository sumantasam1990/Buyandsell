import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public log = {email: '', pass: ''}

  constructor(
    private navctrl: NavController,
    private http: HttpClient,
    private loadingctrl: LoadingController,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  signup() {
    this.navctrl.navigateForward('signup')
  }

  login() {
    this.presentLoading()
    const myheader = new HttpHeaders();
    //myheader.set('Access-Control-Allow-Origin', '*');
    myheader.set('Content-Type', 'application/x-www-form-urlencoded');

    const formData = new FormData();
    formData.append('email', this.log.email);
    formData.append('psw', this.log.pass);

     this.http.post<any>('https://buyandsell.click/api/buyerloginaction', formData, {
      headers: myheader
    }).subscribe(response => {
      this.loadingctrl.dismiss();
      console.log(response.msg)
      if(response.msg) {
        alert(response.msg)
        this.router.navigate(['login'])
      } else {
        localStorage.setItem("u_id", response[1])
        localStorage.setItem("u_email", response[0]);
        this.router.navigate(['']);

      }



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
