import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { IntroPage } from '@pages/auth/intro/intro';
import { InterestsPage } from '@pages/core/interests/interests';

import { User } from '@models/user.model';

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

  public user: User = new User();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.user = this.navParams.get('user');
  }

  onEditProfile() {
    this.navCtrl.push(InterestsPage, {user: this.user});
  }

  onLogout() {
    AuthService.logout();
    this.navCtrl.setRoot(IntroPage, null, {animate: true, direction: 'forward'});
  }

}
