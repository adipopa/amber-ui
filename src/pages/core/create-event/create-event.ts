import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SelectPlacePage } from '@pages/core/create-event/select-place/select-place';

import { Event } from '@models/event.model';
import { Place } from '@models/place.model';

import { EventService } from '@services/event.service';
import { ToastService } from '@services/toast.service';

import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

/**
 * Generated class for the CreateEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-event',
  templateUrl: 'create-event.html',
})
export class CreateEventPage {

  @ViewChild('description') description: ElementRef;

  public event: Event = new Event();

  public eventForm: FormGroup;

  public locationSubject: Subject<Place> = new Subject<Place>();
  private locationSubscription: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private eventService: EventService, private toastService: ToastService) {
    this.eventForm = new FormGroup({
      title: new FormControl(this.event.title, [Validators.required]),
      place: new FormControl(this.event.place.id, [Validators.required]),
      description: new FormControl(this.event.description, []),
      busyTimeStart: new FormGroup({
        startDate: new FormControl(this.event.busyTime.startDate, [Validators.required]),
        startTime: new FormControl(this.event.busyTime.startTime, [Validators.required]),
      }),
      busyTimeEnd: new FormGroup({
        endDate: new FormControl(this.event.busyTime.endDate, [Validators.required]),
        endTime: new FormControl(this.event.busyTime.endTime, [Validators.required]),
      })
    });
  }

  selectPlace() {
    this.locationSubscription = this.locationSubject.subscribe(
      (place) => {
        this.eventForm.controls['place'].setValue(place.id);
        this.event.place = place;
        this.locationSubscription.unsubscribe();
      }
    );
    this.navCtrl.push(SelectPlacePage, {locationSubject: this.locationSubject});
  }

  resize() {
    let element = this.description['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
    let scrollHeight = element.scrollHeight;
    element.style.height = scrollHeight + 'px';
    this.description['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
  }

  onCreateEvent() {
    if (this.eventForm.valid) {
      this.eventService.createEvent(this.event).subscribe(
        (response) => {
          const message = 'Event ' + this.event.title + ' successfully created.';
          this.toastService.showToast(message, 'top');
          this.navCtrl.pop();
          const feedCtrl = this.navParams.get('feedCtrl');
          feedCtrl.parent.select(1);
        },
        (error) => {
          console.log(error);
          const message = 'Incorrect time frame or time frame already used, please change the date-time interval.';
          this.toastService.showToast(message, 'bottom');
        }
      );
    } else {
      const message = 'Please complete the title, time frame and location of the event.';
      this.toastService.showToast(message, 'bottom');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateEventPage');
  }

}
