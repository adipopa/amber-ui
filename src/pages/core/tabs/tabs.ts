import { Component } from '@angular/core';

import { FeedPage } from '../feed/feed';
import { GoingPage } from '../going/going';
import { NotificationsPage } from '../notifications/notifications';
import { PeoplePage } from '../people/people';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FeedPage;
  tab2Root = GoingPage;
  tab3Root = NotificationsPage;
  tab4Root = PeoplePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

  onProfile() {
    this.navCtrl.push(ProfilePage);
  }

}
