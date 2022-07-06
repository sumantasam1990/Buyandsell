import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  id: string
  email: string

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.id = localStorage.getItem('u_id')
    this.email = localStorage.getItem('u_email')
  }

  myorders() {
    this.router.navigate(['myorders'])
  }

  addaddress() {
    this.router.navigate(['addnewaddress']);
  }

  myaccount() {
    this.router.navigate(['myaccount']);
  }

  changepass() {
    this.router.navigate(['changepassword']);
  }

  async cs() {
    await Browser.open({ url: 'https://buyandsell.click/customersupport/#/cs-user/'+this.id+'/'+this.email+'/bes', toolbarColor: '#030577', presentationStyle: 'popover' });
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['login'])
  }

}
