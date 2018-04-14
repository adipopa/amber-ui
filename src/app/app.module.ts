import { ErrorHandler, Injectable, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Firebase } from '@ionic-native/firebase';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Pro } from '@ionic/pro';

import { AmberApp } from './app.component';
import { IntroPage } from '../pages/intro/intro';

import { AuthModule } from '../pages/auth/auth.module';
import { CoreModule } from '../pages/core/core.module';

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

@NgModule({
  declarations: [
    AmberApp,
    IntroPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(AmberApp),
    AuthModule,
    CoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AmberApp,
    IntroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    IonicErrorHandler,
    {provide: ErrorHandler, useClass: AmberErrorHandler},
    Firebase
  ]
})
export class AppModule {
}
