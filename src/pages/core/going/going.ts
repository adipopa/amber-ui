import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { Event } from '@models/event.model';

import { EventService } from '@services/event.service';
import { ToastService } from '@services/toast.service';

import { EventPeoplePage } from '@components/event-card/event-people/event-people';

import { Subscription } from 'rxjs/Subscription';

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

  private userEventsSubscription: Subscription;

  public isLoading = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              private eventService: EventService, private toastService: ToastService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedPage');
    this.viewCtrl.didEnter.subscribe(
      () => {
        this.populateUserEvents();
      }
    );
    this.viewCtrl.didLeave.subscribe(
      () => {
        this.userEventsSubscription.unsubscribe();
      }
    );
  }

  populateUserEvents() {
    this.userEvents = [];
    this.isLoading = true;
    this.userEventsSubscription = this.eventService.userEventsSubject.subscribe(
      (events) => {
        this.userEvents = events;
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
      }
    );
    this.eventService.getUserEvents();
  }

  leaveEvent(event: any) {
    this.eventService.leaveEvent(event).subscribe(
      (response) => {
        this.toastService.showToast('You\'ve left the event ' + event.title + '.', 'top');
        this.populateUserEvents();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteEvent(event: any) {
    this.eventService.deleteEvent(event).subscribe(
      (response) => {
        this.toastService.showToast('You\'ve deleted the event ' + event.title + '.', 'top');
        this.populateUserEvents();
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

  refreshUserEvents(refresher) {
    this.populateUserEvents();
    refresher.complete();
  }
}
