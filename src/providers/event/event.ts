import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HTTP} from "@ionic-native/http";
import {PlaceProvider} from "../place/place";

/*
  Generated class for the EventProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventProvider {

  BASE_EMBER_API_URL = "https://ember-net-api.herokuapp.com/";
  GET_USER_AVAILABLE_EVENTS_ENDPOINT = this.BASE_EMBER_API_URL + "/event/available_events/";
  EVENT_ENDPOINT = this.BASE_EMBER_API_URL + "/event/";


  constructor(private httpRequest: HTTP, public http: HttpClient, private place: PlaceProvider) {
    console.log('Hello EventProvider Provider');
  }

  public createEvent(user_id: number, name: string, address: string, start_date: Date, end_date: Date,
                     latitude: number, longitude: number, jwt: string): any {
    let result = {};

    this.httpRequest.post(this.EVENT_ENDPOINT,
      {user_id: user_id, name: name, address: address, start_date: start_date, end_date: end_date,
      latitude: latitude, longitude: longitude}, {Authorization: jwt}).then(
      response => {

        if(response.status == 409) result = {status: 409, object: 'time-fraken-taken'};

        else result = {status: 200, objec: response.data};
      }
    );

    return result;
  }

  public getEvent(event_id:  number, jwt: string): {status: number, object: any} {
    let result = {status: null, object: null};
    this.httpRequest.get(this.EVENT_ENDPOINT,{event_id: event_id},{Authorization: jwt}).then(
      response => {

        if(response.status == 404) result = {status: 404, object: 'not-found'}

        else result = {status: 200, object: response.data}
      });

    return result;
  }


  public updateEvent(event_id: number, name: string, address: string, start_date: Date, end_date: Date,
                     latitude: number, longitude: number, jwt: string): {status: number, object: any} {
    let result = {status: null, object: null};
    this.httpRequest.put(this.EVENT_ENDPOINT,
      {event_id: event_id, name: name, address: address, start_date: start_date, end_date: end_date,
        latitude: latitude, longitude: longitude}, {Authorization: jwt}).then(
          response => {

            if(response.status == 404) result = {status: 404, object: 'not-found'}

            else result = {status: 200, object: response.data}
          }
    );

    return result;
  }

  public deleteEvent(event_id: number, jwt: string): any {
    let result = {};
    this.httpRequest.delete(this.EVENT_ENDPOINT, {event_id: event_id}, {Authorization: ' '+jwt}).then(
        response => {

          if(response.status == 200) result = {status: 200, object: 'deleted'}

          else result = {status: 404, object: 'not-found'}
        }
    );

    return result;
  }

  public getEventsAvailableToUser(user_id: number, jwt: string): any {
    let location = this.place.getUserLocation();
    let events: [Event];
    this.httpRequest.get(this.GET_USER_AVAILABLE_EVENTS_ENDPOINT,
      {user_id: user_id, lat: location.lat, lng: location.lng},
      {Authorization: jwt}).then( response => {
        // Might be empty
        events = response.data;
      });

    return events
  }

}
