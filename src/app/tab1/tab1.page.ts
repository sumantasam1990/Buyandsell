import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar } from '@capacitor/status-bar';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild("header") header: HTMLElement;

    slideOpts = {
    initialSlide: 0,
    speed: 400,
    //spaceBetween: 2,
    slidesPerView: 6
  };

  url: string = 'https://buyandsell.click/api/buyandsell/category';
  categories: any = [];

  constructor(
    public element: ElementRef,
    public renderer: Renderer2,
    private router: Router,
    private restApi: RestApiService,

  ) {}

  async ngOnInit() {
      await this.restApi.getData(this.url).then(res => {
      this.categories = res;
    })
  }

  ionViewWillEnter() {
    this.renderer.setStyle(this.header['el'], 'webkitTransition', 'top 900ms');
  }

  onContentScroll(event) {
    if (event.detail.scrollTop >= 140 && event.detail.deltaY > 0) {
      this.renderer.setStyle(this.header['el'], 'top', '-300px');
      StatusBar.hide()
    } else {
      this.renderer.setStyle(this.header['el'], 'top', '0px');

    }

    if(event.detail.scrollTop == 0) {
      StatusBar.show()
    }
  }

  doRefresh(event) {
    //this.router.navigate([''])

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['']);
    });


    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  product_list(id) {
    this.router.navigate(['productlist', id])
  }

}
