import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { IntroPage } from '../auth/intro/intro';
import { TabsPage } from '../core/tabs/tabs';

import { AuthService } from '@services/auth.service';

/**
 * Generated class for the StartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');

    // Keeping the loading page up for 3 seconds, then proceed to the specific page based on the login status
    setTimeout(() => {
      if (localStorage.getItem(AuthService.USER_TOKEN_KEY)) {
        console.log('found token');
        this.navCtrl.push(TabsPage);
      } else {
        console.log("user not logged in");
        this.navCtrl.push(IntroPage);
      }
    }, 3000);
  }

}
