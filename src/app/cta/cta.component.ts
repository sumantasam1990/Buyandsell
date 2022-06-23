import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-cta',
  templateUrl: './cta.component.html',
  styleUrls: ['./cta.component.scss'],
})
export class CtaComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  async openGl() {
      await Browser.open({ url: 'https://globallove.online/' });
  }

}
