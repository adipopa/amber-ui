import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '@models/user.model';

/**
 * Generated class for the EventPeoplePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-event-people',
  templateUrl: 'event-people.html',
})
export class EventPeoplePage {

  public users: User[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventPeoplePage');
    this.users = this.navParams.get('users');
  }

  selectUser() {
    // maybe do something when the user is selected
  }

}
