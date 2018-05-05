import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  public nearbyPlacesSubject: Subject<Place[]> = new Subject<Place[]>();

  constructor(private http: HttpClient, private geoLocation: Geolocation) {
    console.log('Hello PlaceService Provider');
  }

  private static geoLocationToString(currLocation): string {
    return currLocation.lat.toString() + ',' + currLocation.lng.toString();
  }

  private parseJsonToPlaceObjects(json: IPlaceArrayResponse): Place[] {
    let parsedResult: Place[] = [];
    for (let x of json.results) {
      let place = new Place();
      place.lng = x.geometry.location.lng;
      place.lat = x.geometry.location.lat;
      place.name = x.name;
      place.id = x.place_id;
      place.address = x.vicinity;
      if (x.photos[0] != null) {
        console.log(x.photos[0].photo_reference);
        // this.queryImageReference(x.photos[0].photo_reference).subscribe(
        //   (image) => {
        //     console.log(image);
        //     // place.thumbnail = image;
        //   },
        //   (error) => {
        //     console.log(error);
        //   }
        // );
      }
      // parsedResult.concat(place)
    }

    return parsedResult;
  }

  private queryImageReference(photoReference: string) {
    let params = new HttpParams();
    params = params.set('key', environment.placesApiKey);
    params = params.set('photoReference', photoReference);
    params = params.set('maxHeight', PlaceService.IMAGE_MAX_HEIGHT);
    params = params.set('maxWidth', PlaceService.IMAGE_MAX_WIDTH);

    return this.http.get<File>(PlaceService.PLACES_API_IMAGE_PATH, {params: params});
  }

  public queryPlaces() {
    /** Returns a list of places for an event. */

    this.geoLocation.getCurrentPosition().then((resp) => {

      let currLocation = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      };

      let params = new HttpParams();
      params = params.set('location', PlaceService.geoLocationToString(currLocation));
      params = params.set('key', environment.placesApiKey);
      params = params.set('radius', '25000');
      params = params.set('type', 'restaurant');

      this.http.get<IPlaceArrayResponse>(PlaceService.PLACES_API_NEARBY_PATH, {params: params}).subscribe(
        (response) => {
          let places = this.parseJsonToPlaceObjects(response);
          this.nearbyPlacesSubject.next(places);
        },
        (error) => {
          console.log(error);
        }
      );
    }).catch(error => {
      console.log(error)
    });
  }

}
