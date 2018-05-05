import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';

/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }

  onLoginByUsername() {
    this.navCtrl.push(LoginPage);
  }

  onCreateAccount() {
    this.navCtrl.push(RegisterPage);
  }

}
