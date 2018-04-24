import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FeedPage } from '../feed/feed';
import { GoingPage } from '../going/going';
import { NotificationsPage } from '../notifications/notifications';
import { PeoplePage } from '../people/people';

import { ProfilePage } from '../profile/profile';

import { UserService } from '@services/user.service';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FeedPage;
  tab2Root = GoingPage;
  tab3Root = NotificationsPage;
  tab4Root = PeoplePage;

  firstLogin: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

  onProfile() {
    this.navCtrl.push(ProfilePage);
  }

}
