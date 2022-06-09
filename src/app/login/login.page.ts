import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private navctrl: NavController,
  ) { }

  ngOnInit() {
  }

  signup() {
    this.navctrl.navigateForward('signup')
  }

  login() {
    this.navctrl.navigateRoot('')
  }

}
