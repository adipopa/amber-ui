import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { Event } from '@models/event.model';

import { EventService } from '@services/event.service';
import { ToastService } from '@services/toast.service';

import { EventPeoplePage } from '@components/event-card/event-people/event-people';

/**
 * Generated class for the GoingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-going',
  templateUrl: 'going.html',
})
export class GoingPage {

  public userEvents: Event[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              private eventService: EventService, private toastService: ToastService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoingPage');
    this.eventService.userEventsSubject.subscribe(
      (events) => {
        this.userEvents = events;
      },
      (error) => {
        console.log(error);
      }
    );
    this.viewCtrl.didEnter.subscribe(
      () => {
        this.userEvents = [];
        this.eventService.getUserEvents();
      }
    );
  }

  leaveEvent(event: any) {
    this.eventService.joinEvent(event).subscribe(
      (response) => {
        this.toastService.showToast('You\'ve left the event ' + event.title + '.', 'top');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showPeople(event: any) {
    let coreCtrl = this.navParams.get('coreCtrl');
    coreCtrl.push(EventPeoplePage, {users: event.users});
  }

}
