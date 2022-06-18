import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-placeordersuccess',
  templateUrl: './placeordersuccess.page.html',
  styleUrls: ['./placeordersuccess.page.scss'],
})
export class PlaceordersuccessPage implements OnInit {

  constructor(
    private navctrl: NavController,
  ) { }

  ngOnInit() {
  }

  myorders() {
    this.navctrl.navigateForward('myorders')
  }

}
