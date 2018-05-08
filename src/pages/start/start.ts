import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { IntroPage } from '../auth/intro/intro';

import { InterestsPage } from '@pages/core/interests/interests';
import { TabsPage } from '@pages/core/tabs/tabs';

import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');

    // Keeping the loading page up for 2 seconds, then proceed to the specific page based on the login status
    setTimeout(() => {
      if (localStorage.getItem(AuthService.USER_TOKEN_KEY)) {
        this.resolveNextPage();
      } else {
        this.navCtrl.push(IntroPage);
      }
    }, 2000);
  }

  resolveNextPage() {
    this.userService.getUserDetails().subscribe(
      (user) => {
        if (user.firstLogin) {
          this.navCtrl.setRoot(InterestsPage, null, {animate: true, direction: 'forward'});
        } else {
          this.navCtrl.setRoot(TabsPage, null, {animate: true, direction: 'forward'});
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
