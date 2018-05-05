import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation';

import { Subject } from 'rxjs/Subject';

import { environment } from '@environment';

/*
  Generated class for the EventService provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventService {

  static readonly AVAILABLE_EVENTS_PATH = `${environment.baseURL}/event/available_events`;
  static readonly EVENT_PATH = `${environment.baseURL}/event`;

  public availableEventsSubject: Subject<Event[]> = new Subject<Event[]>();

  constructor(private http: HttpClient, private geoLocation: Geolocation) {
    console.log('Hello EventService Provider');
  }

  getEventsAvailableToUser(userId: any) {
    /** Returns a list of places for an event. */

    this.geoLocation.getCurrentPosition().then((resp) => {
      let currLocation = {
        lat: resp.coords.latitude.toString(),
        lng: resp.coords.longitude.toString()
      };

      let params = new HttpParams();
      params = params.set('userId', userId);
      params = params.set('lat', currLocation.lat);
      params = params.set('lng', currLocation.lng);

      this.http.get<Event[]>(EventService.AVAILABLE_EVENTS_PATH, {params: params}).subscribe(
        (events) => {
          this.availableEventsSubject.next(events);
        },
        (error) => {
          console.log(error);
        }
      );
    });


  }

  createEvent(event: Event) {
    return this.http.post(EventService.EVENT_PATH, event);
  }

  getEvent(eventId: any) {
    let params = new HttpParams();
    params = params.set('eventId', eventId);

    return this.http.get<Event>(EventService.EVENT_PATH, {params: params});
  }


  updateEvent(event: Event) {
    return this.http.put(EventService.EVENT_PATH, event);
  }

  deleteEvent(eventId: any) {
    let params = new HttpParams();
    params = params.set('eventId', eventId);

    return this.http.delete(EventService.EVENT_PATH, {params: params});
  }

}
