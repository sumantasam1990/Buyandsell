import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.page.html',
  styleUrls: ['./myorders.page.scss'],
})
export class MyordersPage implements OnInit {

  private url: string = "https://buyandsell.click/api/buyandsell/buyerorders/"
  public orders: any = []

  constructor(
    private restApi: RestApiService,
  ) { }

  ngOnInit() {
    this.restApi.getData(this.url + localStorage.getItem('u_id')).then(res => {
      this.orders = res
    })
  }

  ionViewWillEnter() {
    this.restApi.getData(this.url + localStorage.getItem('u_id')).then(res => {
      this.orders = res
    })
  }

}
