import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.page.html',
  styleUrls: ['./myaccount.page.scss'],
})
export class MyaccountPage implements OnInit {

  name: string
  email: string
  phone: string
  address: string

  constructor(
    private restapi: RestApiService,
  ) { }

  ngOnInit() {
    const url = "https://buyandsell.click/api/myaccount/"
    this.restapi.getData(url + localStorage.getItem('u_id')).then(res => {
      this.name = res[0].name
      this.email = res[0].email
      this.phone = res[0].buyer_del_phn_no
      this.address = res[0].buyer_del_address + ', ' + res[0].buyer_del_country + ', ' + res[0].buyer_del_city + ', ' + res[0].buyer_del_state + ', ' + res[0].buyer_del_postcode + ', ' + res[0].buyer_del_email + ', ' + res[0].buyer_del_phn_no
    })
  }

}
