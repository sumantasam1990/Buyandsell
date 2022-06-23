import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar, ModalController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  @ViewChild('searchbar') IonSearchbar:IonSearchbar;

  url: string = "https://buyandsell.click/api/buyandsell/searchproduct/"
  keyword: any
  products: any = []

  constructor(
    private router: Router,
    private restapi: RestApiService,
    private modalctrl: ModalController,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.IonSearchbar.setFocus();
    }, 600);
  }

  async getSearchResults() {
    await this.restapi.getData(this.url + this.keyword).then(res => {
      this.products = res
    })
  }

  product(id) {
    this.modalctrl.dismiss()
    this.router.navigate(['product', id])
  }


}
