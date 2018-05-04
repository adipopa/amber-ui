import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { IntroPage } from '../../auth/intro/intro';

import { AuthService } from '@services/auth.service';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  onLogout() {
    AuthService.logout();
    this.navCtrl.setRoot(IntroPage, null, {animate: true, direction: 'forward'});
  }

}
