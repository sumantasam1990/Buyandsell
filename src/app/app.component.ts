import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private navctrl: NavController,
  ) {
    window.addEventListener('statusTap', function () {
      alert('tapped')
    });

    StatusBar.setOverlaysWebView({ overlay: false });

    StatusBar.setStyle({ style: Style.Dark });

    this.navctrl.navigateRoot('')
  }
}
