import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-placeordersuccess',
  templateUrl: './placeordersuccess.page.html',
  styleUrls: ['./placeordersuccess.page.scss'],
})
export class PlaceordersuccessPage implements OnInit {

  constructor(
    private navctrl: NavController,
    private modalctrl: ModalController,
  ) { }

  ngOnInit() {
    this.modalctrl.dismiss();
  }

  myorders() {
    this.navctrl.navigateForward('myorders')
  }

}
