import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-recomendation',
  templateUrl: './recomendation.component.html',
  styleUrls: ['./recomendation.component.scss'],
})
export class RecomendationComponent implements OnInit {

  data: any = []

  constructor(
    private restapi: RestApiService,
    private router: Router,
  ) { }

  ngOnInit() {
    const url = "https://buyandsell.click/api/recommendation"
    this.restapi.getData(url).then(res => {
      this.data = res
    })
  }

  singlepage(id) {
    this.router.navigate(['product', id])
  }

}
