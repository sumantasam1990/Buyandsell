import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-placeorderfailed',
  templateUrl: './placeorderfailed.page.html',
  styleUrls: ['./placeorderfailed.page.scss'],
})
export class PlaceorderfailedPage implements OnInit {

  constructor(
    private navctrl: NavController,
    private modalctrl: ModalController,
  ) { }

  ngOnInit() {
    this.modalctrl.dismiss()
  }


  cart() {
    this.navctrl.navigateRoot('')
  }

}
