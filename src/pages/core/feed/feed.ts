import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CreateEventPage } from '@pages/core/create-event/create-event';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

  public events: Event[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedPage');
  }

  onCreateEvent() {
    let parentCtrl = this.navParams.get('parentCtrl');
    parentCtrl.push(CreateEventPage);
  }

}
