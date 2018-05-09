import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { User } from '@models/user.model';
import { UserService } from '@services/user.service';

import { Subscription } from 'rxjs/Subscription';

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

  public activeUsers: User[] = [];

  private activeUsersSubscription: Subscription;

  public isLoading = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController, private userService: UserService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PeoplePage');
    this.viewCtrl.didEnter.subscribe(
      () => {
        this.populateActiveUsers();
      }
    );
    this.viewCtrl.didLeave.subscribe(
      () => {
        this.activeUsersSubscription.unsubscribe();
      }
    );
  }

  populateActiveUsers() {
    this.activeUsers = [];
    this.isLoading = true;
    this.activeUsersSubscription = this.userService.getActiveUsers().subscribe(
      (users) => {
        this.activeUsers = users;
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  selectUser() {
    // maybe do something when the user is selected
  }

  refreshActiveUsers(refresher) {
    this.populateActiveUsers();
    refresher.complete();
  }

}
