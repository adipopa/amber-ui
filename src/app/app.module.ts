import { ErrorHandler, Injectable, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// These are all imports required for Pro Client with Monitoring & Deploy,
// feel free to merge into existing imports above.
import { Pro } from '@ionic/pro';
import { PlaceProvider } from '../providers/place/place';
import {Geolocation} from "@ionic-native/geolocation";
import {HTTP} from "@ionic-native/http";

import {SocketIoConfig, SocketIoModule} from "ng-socket-io";
import { MessagingProvider } from '../providers/messaging/messaging';
import { EventProvider } from '../providers/event/event';

Pro.init('fa980516', {
  appVersion: '0.0.1'
});

@Injectable()
export class AmberErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch (e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
    }
  }

  handleError(err: any): void {
    Pro.monitoring.handleNewError(err);
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}

const config: SocketIoConfig = {url: "https://ember-api.herokuapp.com/", options: {}};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SocketIoModule.forRoot(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    HTTP
  ],
  providers: [
    StatusBar,
    SplashScreen,
    IonicErrorHandler,
    {provide: ErrorHandler, useClass: AmberErrorHandler},
    PlaceProvider,
    Geolocation,
    HTTP,
    MessagingProvider,
    EventProvider
  ]
})
export class AppModule {
}
