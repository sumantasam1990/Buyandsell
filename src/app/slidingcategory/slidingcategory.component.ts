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
    //spaceBetween: 2,
    slidesPerView: 6
  };

  url: string = 'https://buyandsell.click/api/buyandsell/category';
  categories: any = [];
  count: number = 0
  countId: any = 0

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
    if(this.count == 0 && this.countId == 0) {
      this.count = 1
      this.countId = id
      alert('title')
    } else if(this.count == 1 && this.countId == id) {
      this.router.navigate(['productlist', id])
    } else {
      alert('else')
    }

  }

}
