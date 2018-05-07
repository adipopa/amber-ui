import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Event } from '@models/event.model';
import { SelectPlacePage } from '@pages/core/create-event/select-place/select-place';
import { Subject } from 'rxjs/Subject';
import { Place } from '@models/place.model';
import { Subscription } from 'rxjs/Subscription';
import { EventService } from '@services/event.service';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private eventService: EventService) {
    this.eventForm = new FormGroup({
      title: new FormControl(this.event.title, [Validators.required]),
      place: new FormControl(this.event.place.id, [Validators.required]),
      description: new FormControl(this.event.description, []),
      busyTimeStart: new FormGroup({
        startDate: new FormControl(this.event.busyTime.startDate, [Validators.required]),
        startTime: new FormControl(this.event.busyTime.startTime, [Validators.required]),
      }),
      busyTimeEnd: new FormGroup({
        endDate: new FormControl(this.event.busyTime.endDate, []),
        endTime: new FormControl(this.event.busyTime.endTime, []),
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
    console.log(this.event);
    // this.eventService.createEvent(this.event).subscribe(
    //   (response) => {
    //     console.log('Event with title: ' + this.event.title + ' successfully created.');
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateEventPage');
  }

}
