import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  public notifications: any[] = [];

  public isLoading = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PeoplePage');
    this.viewCtrl.didEnter.subscribe(
      () => {
        this.populateNotifications();
      }
    );
  }

  populateNotifications() {
    this.notifications = [];
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  refreshNotifications(refresher) {
    this.populateNotifications();
    refresher.complete();
  }

}
