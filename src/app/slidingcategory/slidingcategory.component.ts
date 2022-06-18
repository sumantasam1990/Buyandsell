import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';


@Component({
  selector: 'app-slidingcategory',
  templateUrl: './slidingcategory.component.html',
  styleUrls: ['./slidingcategory.component.scss'],
})
export class SlidingcategoryComponent implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    spaceBetween: 10,
    slidesPerView: 5
  };

  url: string = 'https://buyandsell.click/api/buyandsell/category';
  categories: any = [];

  constructor(
    private restApi: RestApiService,
    private router: Router,
  ) { }

  async ngOnInit() {
    await this.restApi.getData(this.url).then(res => {
      this.categories = res;
    })
  }

  product_list(id) {
    this.router.navigate(['productlist', id])
  }

}
