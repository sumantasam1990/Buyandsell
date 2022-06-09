import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  url: string = 'https://buyandsell.click/api/buyandsell/category';
  categories: any = []

  constructor(
    private navctrl: NavController,
    private restApi: RestApiService,
    private router: Router,
  ) {}

  async ngOnInit() {
    await this.restApi.getData(this.url).then(res => {
      this.categories = res
    })
  }

  product_list(id) {
    this.router.navigate(['productlist', id])
  }

}
