import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PlaceService } from "./place.service";

import { environment } from '@environment';

/*
  Generated class for the EventProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventService {

  static readonly AVAILABLE_EVENTS_PATH = `${environment.baseURL}/event/available_events`;
  static readonly EVENT_PATH = `${environment.baseURL}/event`;


  constructor(private http: HttpClient, private placeService: PlaceService) {
    console.log('Hello EventProvider Provider');
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

  getEventsAvailableToUser(userId: any) {
    let location = this.placeService.getUserLocation();

    let params = new HttpParams();
    params = params.set('userId', userId);
    params = params.set('lat', location.lat);
    params = params.set('lng', location.lng);

    return this.http.get<Event[]>(EventService.AVAILABLE_EVENTS_PATH, {params: params});
  }

}
