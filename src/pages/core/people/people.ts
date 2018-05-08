import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { User } from '@models/user.model';

/**
 * Generated class for the PeoplePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-people',
  templateUrl: 'people.html',
})
export class PeoplePage {

  public users: User[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PeoplePage');

  }

  selectUser() {
    // maybe do something when the user is selected
  }

}
