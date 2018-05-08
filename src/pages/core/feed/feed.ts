import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { CreateEventPage } from '@pages/core/create-event/create-event';

import { Event } from '@models/event.model';

import { EventService } from '@services/event.service';
import { ToastService } from '@services/toast.service';

import { EventPeoplePage } from '@components/event-card/event-people/event-people';

import { Subscription } from 'rxjs/Subscription';

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

  public availableEvents: Event[] = [];

  private availableEventsSubscription: Subscription;

  public isLoading = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              private eventService: EventService, private toastService: ToastService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedPage');
    this.viewCtrl.didEnter.subscribe(
      () => {
        this.populateAvailableEvents();
      }
    );
    this.viewCtrl.didLeave.subscribe(
      () => {
        this.availableEventsSubscription.unsubscribe();
      }
    );
  }

  populateAvailableEvents() {
    this.availableEvents = [];
    this.isLoading = true;
    this.availableEventsSubscription = this.eventService.availableEventsSubject.subscribe(
      (events) => {
        this.availableEvents = events;
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
      }
    );
    this.eventService.getEventsAvailableToUser();
  }

  onCreateEvent() {
    let coreCtrl = this.navParams.get('coreCtrl');
    coreCtrl.push(CreateEventPage, {feedCtrl: this.navCtrl});
  }

  joinEvent(event: any) {
    this.eventService.joinEvent(event).subscribe(
      (response) => {
        this.toastService.showToast('Joined event ' + event.title + '.', 'top');
        this.populateAvailableEvents();
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
