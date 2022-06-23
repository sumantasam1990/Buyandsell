import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';

import { createAnimation, IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NativePageTransitions } from '@awesome-cordova-plugins/native-page-transitions/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(
    {
      //mode: 'md'
    }
  ), AppRoutingModule, HttpClientModule, ReactiveFormsModule, FormsModule, ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, SQLite, NativePageTransitions],
  bootstrap: [AppComponent],
})
export class AppModule {}


