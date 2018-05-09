import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FeedPage } from '../feed/feed';
import { GoingPage } from '../going/going';
import { NotificationsPage } from '../notifications/notifications';
import { PeoplePage } from '../people/people';

import { ProfilePage } from '../profile/profile';

import { User } from '@models/user.model';
import { Interest } from '@models/interest.model';
import { Option } from '@models/option.model';

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

  public currentUser: User = new User();

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
    this.getCurrentUser();
  }

  onProfile() {
    this.navCtrl.push(ProfilePage, {user: this.currentUser});
  }

  getCurrentUser() {
    this.userService.getUserDetails().subscribe(
      (user) => {
        this.currentUser = user;
        this.populateInterests();
      },
      (error) => {
        console.log("Couldn't retrieve user details.");
      }
    );
  }

  populateInterests() {
    let interests: any[] = this.currentUser.interests;
    let newInterests: Interest[] = [];
    for (let category in interests) {
      let newInterest = new Interest();
      newInterest.category = category;
      interests[category].forEach(label => {
        let newOption = new Option();
        newOption.label = label;
        newInterest.options.push(newOption);
      });
      newInterests.push(newInterest);
    }
    this.currentUser.interests = newInterests;
  }

}
