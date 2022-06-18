import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-placeorderfailed',
  templateUrl: './placeorderfailed.page.html',
  styleUrls: ['./placeorderfailed.page.scss'],
})
export class PlaceorderfailedPage implements OnInit {

  constructor(
    private navctrl: NavController,
  ) { }

  ngOnInit() {
  }

  cart() {
    this.navctrl.navigateRoot('')
  }

}
