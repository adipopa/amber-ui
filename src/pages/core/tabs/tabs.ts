import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FeedPage } from '../feed/feed';
import { GoingPage } from '../going/going';
import { NotificationsPage } from '../notifications/notifications';
import { PeoplePage } from '../people/people';

import { ProfilePage } from '../profile/profile';

import { User } from '@models/user.model';

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

  public currentUser: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
    this.getCurrentUser();
  }

  onProfile() {
    this.navCtrl.push(ProfilePage);
  }

  getCurrentUser() {
    this.userService.getUserDetails().subscribe(
      (user) => {
        console.log(user);
        this.currentUser = user;
      },
      (error) => {
        console.log("Couldn't retrieve user details.");
      }
    );
  }

}
