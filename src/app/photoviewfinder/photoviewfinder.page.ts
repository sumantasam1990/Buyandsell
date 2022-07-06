import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-photoviewfinder',
  templateUrl: './photoviewfinder.page.html',
  styleUrls: ['./photoviewfinder.page.scss'],
})
export class PhotoviewfinderPage implements OnInit {

  imageUrl: String;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
  ) { }

  ngOnInit() {
    this.imageUrl = this.route.snapshot.paramMap.get('url')
    this.imageUrl = 'https://buyandsell.click/images/' + this.imageUrl
  }

  close() {
    this._location.back();
  }

}
