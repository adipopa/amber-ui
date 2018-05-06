import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Event } from '@models/event.model';

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

  event: Event = new Event();

  public eventForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.eventForm = new FormGroup({
      title: new FormControl(this.event.title, [Validators.required]),
      description: new FormControl(this.event.description, []),
      place: new FormControl(this.event.place.id, [Validators.required])
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateEventPage');
  }

}
