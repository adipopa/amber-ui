import { Component, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Network } from '@ionic-native/network';

import { StartPage } from '@pages/start/start';

import { ToastService } from '@services/toast.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  templateUrl: 'app.html'
})
export class AmberApp {

  @ViewChild('appNav') nav: NavController;
  public rootPage: any = StartPage;

  private connectSubscription: Subscription;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private network: Network, private toastService: ToastService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.network.onDisconnect().subscribe(() => {
      console.log('Network disconnected!');
      this.toastService.presentNetworkErrorToast();
      if (this.connectSubscription == null) {
        this.connectSubscription = this.network.onConnect().subscribe(() => {
          console.log('Network connected!');
          setTimeout(() => {
            this.toastService.dismissNetworkErrorToast();
            this.nav.setRoot(StartPage, null, {animate: true, direction: 'forward'});
          }, 3000);
          this.connectSubscription.unsubscribe();
          this.connectSubscription = null;
        });
      }
    });
  }

  // Wait for the components in AmberApp's template to be initialized
  // In this case, we are waiting for the Nav with reference variable of "#appNav"
  ngOnInit() {
    // Let's navigate from TabsPage to StartPage
  }
}
