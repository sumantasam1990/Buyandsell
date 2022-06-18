import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrls: ['./new-arrivals.component.scss'],
})
export class NewArrivalsComponent implements OnInit {

  data: any = []

  constructor(
    private restapi: RestApiService,
    private router: Router,
  ) { }

  ngOnInit() {
    const url = "https://buyandsell.click/api/newarrivals"
    this.restapi.getData(url).then(res => {
      this.data = res[0]
    })
  }

  singlepage(id) {
    this.router.navigate(['product', id])
  }

}
