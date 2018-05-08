import { Injectable } from '@angular/core';

import { HTTP } from '@ionic-native/http';
import { Geolocation } from "@ionic-native/geolocation";

import { Place } from '@models/place.model';

import { Subject } from 'rxjs/Subject';

import { environment } from '@environment';

/*
  Generated class for the PlaceService provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlaceService {

  static readonly PLACES_API_NEARBY_PATH = `${environment.placesApiURL}/nearbysearch/json`;
  static readonly PLACES_API_IMAGE_PATH = `${environment.placesApiURL}/photo`;

  static readonly IMAGE_MAX_HEIGHT = '400';
  static readonly IMAGE_MAX_WIDTH = '400';

  private nearbyPlaces: Place[] = [];

  public nearbyPlacesSubject: Subject<Place[]> = new Subject<Place[]>();

  constructor(private http: HTTP, private geolocation: Geolocation) {
    console.log('Hello PlaceService Provider');
  }

  private static geolocationToString(currLocation): string {
    return currLocation.lat.toString() + ',' + currLocation.lng.toString();
  }

  private parseJsonToPlaceObjects(json: IPlaceArrayResponse, size: number) {
    for (let x of json.results) {
      let place = new Place();
      place.lng = x.geometry.location.lng;
      place.lat = x.geometry.location.lat;
      place.name = x.name;
      place.id = x.place_id;
      place.address = x.vicinity;
      place.type = x.types[0];
      // TODO: Delete the console.log
      console.log(place.type);
      if (x.photos != null) {
        this.queryImageReference(x.photos[0].photo_reference).then(
          (response) => {
            place.thumbnail = response.url;
            this.nearbyPlaces.push(place);
            if (this.nearbyPlaces.length == size) {
              this.nearbyPlacesSubject.next(this.nearbyPlaces);
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.nearbyPlaces.push(place);
        if (this.nearbyPlaces.length == size) {
          this.nearbyPlacesSubject.next(this.nearbyPlaces);
        }
      }
    }

  }

  private queryImageReference(photoReference: string) {
    let params = {
      key: environment.placesApiKey,
      photoreference: photoReference,
      maxheight: PlaceService.IMAGE_MAX_HEIGHT,
      maxwidth: PlaceService.IMAGE_MAX_WIDTH
    };

    return this.http.get(PlaceService.PLACES_API_IMAGE_PATH, params, {});
  }

  public queryPlaces() {
    /** Returns a list of places for an event. */

    this.nearbyPlaces = [];

    this.geolocation.getCurrentPosition().then((resp) => {

      let currLocation = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      };

      let types = [
        'restaurant',
        'school',
      ];

      types.forEach(type => {
        let params = {
          location: PlaceService.geolocationToString(currLocation),
          key: environment.placesApiKey,
          radius: '15000',
          type: type
        };

        this.http.get(PlaceService.PLACES_API_NEARBY_PATH, params, {}).then(
          (response) => {
            this.parseJsonToPlaceObjects(JSON.parse(response.data), types.length * 20);
          })
          .catch((error) => {
            console.log(error);
          });
      });

    }).catch(error => {
      console.log(error)
    });
  }

}
