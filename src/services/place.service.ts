import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Geolocation } from "@ionic-native/geolocation";

import { environment } from '@environment';
import { Place } from '@models/place.model';

/*
  Generated class for the PlaceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlaceService {

  static readonly PLACES_API_NEARBY_PATH = `${environment.placesApiURL}/nearbysearch/json`;
  static readonly PLACES_API_IMAGE_PATH = `${environment.placesApiURL}/photo`;

  static readonly IMAGE_MAX_HEIGHT = '400';
  static readonly IMAGE_MAX_WIDTH = '400';

  private currLocation: {lat: any, lng: any};


  constructor(private http: HttpClient, private geoLocation: Geolocation) {
    console.log('Hello PlaceProvider Provider');
  }

  private queryGeoLocation(): void {
    this.geoLocation.getCurrentPosition().then((resp) => {
      this.currLocation = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      }
    });
  }

  private geoLocationToString(): string {
    return this.currLocation.lat.toString() + ',' + this.currLocation.lng.toString();
  }

  private parseJsonToPlaceObjects(json: IPlaceArrayResponse): Place[] {
    let parsedResult: Place[] = [];
    for (let x of json.results) {
      let place = new Place();
      place.lng = x.geometry.location.lng;
      place.lat = x.geometry.location.lat;
      place.name = x.name;
      place.address = x.vicinity;
      this.queryImageReference(x.photos.photo_reference).subscribe(
        (image) => {
          place.thumbnail = image;
        },
        (error) => {
          console.log(error);
        }
      );
      parsedResult.concat(place)
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
    this.queryGeoLocation();

    let params = new HttpParams();
    params = params.set('location', this.geoLocationToString());
    params = params.set('key', environment.placesApiKey);
    params = params.set('radius', '25000');
    params = params.set('type', 'restaurant');

    return this.http.get<Place[]>(PlaceService.PLACES_API_NEARBY_PATH, {params: params});

    // result = this.parseJsonToPlaceObjects(data.data.result);
  }

  public getUserLocation(): {lat: any, lng: any} {
    this.queryGeoLocation();
    return this.currLocation;
  }
}
