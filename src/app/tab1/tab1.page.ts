import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { StatusBar } from '@capacitor/status-bar';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild("header") header: HTMLElement;

  constructor(
    public element: ElementRef,
    public renderer: Renderer2,

  ) {}

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

}
