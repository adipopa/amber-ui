import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation';

import { Event } from '@models/event.model';

import { Subject } from 'rxjs/Subject';

import { environment } from '@environment';

/*
  Generated class for the EventService provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventService {

  static readonly EVENT_PATH = `${environment.baseURL}/event`;
  static readonly AVAILABLE_EVENTS_PATH = `${environment.baseURL}/event/available-events`;
  static readonly USER_EVENTS_PATH = `${environment.baseURL}/event/user`;

  public availableEventsSubject: Subject<Event[]> = new Subject<Event[]>();
  public userEventsSubject: Subject<Event[]> = new Subject<Event[]>();

  static readonly EVENT_SEARCH_RADIUS = '15';

  constructor(private http: HttpClient, private geolocation: Geolocation) {
    console.log('Hello EventService Provider');
  }

  getEventsAvailableToUser() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let currLocation = {
        lat: resp.coords.latitude.toString(),
        lng: resp.coords.longitude.toString()
      };

      let params = new HttpParams();
      params = params.set('lat', currLocation.lat);
      params = params.set('lng', currLocation.lng);
      params = params.set('searchRadius', EventService.EVENT_SEARCH_RADIUS);

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

  createEvent(event: any) {
    return this.http.post(EventService.EVENT_PATH, event);
  }

  getUserEvents() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let currLocation = {
        lat: resp.coords.latitude.toString(),
        lng: resp.coords.longitude.toString()
      };

      let params = new HttpParams();
      params = params.set('lat', currLocation.lat);
      params = params.set('lng', currLocation.lng);

      this.http.get<Event[]>(EventService.USER_EVENTS_PATH, {params: params}).subscribe(
        (events) => {
          this.userEventsSubject.next(events);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  joinEvent(event: any) {
    return this.http.patch(EventService.USER_EVENTS_PATH, {
      eventId: event.id
    });
  }

  leaveEvent(event: any) {
    let params = new HttpParams();
    params = params.set('eventId', event.id);

    return this.http.delete(EventService.USER_EVENTS_PATH, {
      params: params
    });
  }

  getEvent(eventId: any) {
    let params = new HttpParams();
    params = params.set('eventId', eventId);

    return this.http.get<Event>(EventService.EVENT_PATH, {params: params});
  }

  deleteEvent(eventId: any) {
    let params = new HttpParams();
    params = params.set('eventId', eventId);

    return this.http.delete(EventService.EVENT_PATH, {params: params});
  }

}
