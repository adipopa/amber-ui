import { Injectable } from '@angular/core';

import { HTTP } from '@ionic-native/http';
import { Geolocation } from "@ionic-native/geolocation";

import { Place } from '@models/place.model';

import { ToastService } from '@services/toast.service';

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
  private placesCount = 0;

  public nearbyPlacesSubject: Subject<Place[]> = new Subject<Place[]>();

  constructor(private http: HTTP, private geolocation: Geolocation, private toastService: ToastService) {
    console.log('Hello PlaceService Provider');
  }

  private static geolocationToString(currLocation): string {
    return currLocation.lat.toString() + ',' + currLocation.lng.toString();
  }

  private parseJsonToPlaceObjects(json: IPlaceArrayResponse) {
    this.placesCount += json.results.length;
    for (let x of json.results) {
      let place = new Place();
      place.lng = x.geometry.location.lng;
      place.lat = x.geometry.location.lat;
      place.name = x.name;
      place.id = x.place_id;
      place.address = x.vicinity;
      place.type = x.types[0];
      if (x.photos != null) {
        this.queryImageReference(x.photos[0].photo_reference).then(
          (response) => {
            place.thumbnail = response.url;
            this.nearbyPlaces.push(place);
            if (this.nearbyPlaces.length == this.placesCount) {
              this.nearbyPlacesSubject.next(this.nearbyPlaces);
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.nearbyPlaces.push(place);
        if (this.nearbyPlaces.length == this.placesCount) {
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
    this.placesCount = 0;

    this.geolocation.getCurrentPosition({timeout: 5000, enableHighAccuracy: true}).then((resp) => {

      this.toastService.dismissLocationErrorToast();

      let currLocation = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      };

      let types = [
        'school',
        'restaurant',
        'cafe'
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
            this.parseJsonToPlaceObjects(JSON.parse(response.data));
          })
          .catch((error) => {
            console.log(error);
          });
      });

    }).catch(error => {
      console.log(error);
      this.toastService.presentLocationErrorToast();
      setTimeout(() => {
        this.queryPlaces();
      }, 3000);
    });
  }

}
