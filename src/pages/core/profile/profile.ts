import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthService } from '../../auth/auth.service';
import { StartPage } from '../../start/start';
import { IntroPage } from '../../auth/intro/intro';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private authService: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  onLogout() {
    this.authService.logout();
    this.navCtrl.setRoot(IntroPage, null, {animate: true, direction: 'forward'});
  }

}
