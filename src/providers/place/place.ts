import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Geolocation} from "@ionic-native/geolocation";
import {HTTP} from "@ionic-native/http";

/*
  Generated class for the PlaceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlaceProvider {

  private PLACES_API_NEARBY_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
  private PLACES_API_IMAGE_URL = "https://maps.googleapis.com/maps/api/place/photo";
  private PLACES_API_DETAILS_URL = "https://maps.googleapis.com/maps/api/place/details/json";
  private PLACES_API_KEY = "AIzaSyDlziIMCMhOzXQxCDJT-rqWoVLfU0Chm0k";
  private IMAGE_MAX_HEIGHT = 400;
  private IMAGE_MAX_WIDTH = 400;

  private currLocation: {lat: number, lng: number};


  constructor(private httpRequest: HTTP, private geoLocation: Geolocation, public http: HttpClient) {
    console.log('Hello PlaceProvider Provider');
  }

  private queryGeoLocation(): void {
    this.geoLocation.getCurrentPosition().then((resp) => {
      this.currLocation = {lat: resp.coords.latitude, lng: resp.coords.longitude}
    });
  }

  private geoLocationToString(): string {
    return this.currLocation.lat.toString()+','+this.currLocation.lng.toString();
  }

  private parseJsonToPlaceShortObjects(json: IPlaceShortArrayResponse): [PlaceShort] {
    let parsedResult: [PlaceShort];
    for (let x of json.results) {
      let place = new PlaceShort();
      place.lng = x.geometry.location.lng;
      place.lat = x.geometry.location.lat;
      place.name = x.name;
      place.place_id = x.place_id;
      place.thumbnail = this.queryImageReference(x.photos.photo_reference);

      parsedResult.concat(place)
    }

    return parsedResult;
  }

  private parseJsonToPlaceDetailObject(json: IPlaceDetailResponse): PlaceDetail {
    let placeDetail = new PlaceDetail();
    placeDetail.name = json.result.name;
    placeDetail.lat = json.result.geometry.location.lat;
    placeDetail.lng = json.result.geometry.location.lng;
    placeDetail.rating = json.result.rating;
    placeDetail.phone_number = json.result.formatted_phone_number;
    json.result.photos.forEach((photo) => {
      placeDetail.photos.concat(this.queryImageReference(photo.photo_reference))
    });

    return placeDetail;
  }

  private queryImageReference(photo_reference: string): File {
    let image: File;

    this.httpRequest.get(this.PLACES_API_IMAGE_URL, {key: this.PLACES_API_KEY,
            photoreference: photo_reference, maxheight: this.IMAGE_MAX_HEIGHT,
            maxwidth: this.IMAGE_MAX_WIDTH}, {}).then(data => {
        console.log('queryImageReference status: ' + data.status);
        image = data.data;
    });

    return image;
  }

  public queryPlacesShort(): [PlaceShort] {
    /** Returns a list of places for an event. */
    let result: [PlaceShort];
    this.queryGeoLocation();

    this.httpRequest.get(this.PLACES_API_NEARBY_URL, {location: this.geoLocationToString(),
      key: this.PLACES_API_KEY, radius: "25000", type: "restaurant"}, {}).then(data => {
      console.log("queryPlacesShort status: " + data.status);
      result = this.parseJsonToPlaceShortObjects(data.data.result);
    });

    return result;
  }

  public queryPlaceDetail(place_id: string): PlaceDetail {
    /** Returns the details for a place selected by the user. */
    let placeDetail = new PlaceDetail();

    this.httpRequest.get(this.PLACES_API_DETAILS_URL,
      {key: this.PLACES_API_KEY, placeid: place_id}, {}).then(data => {
        console.log('queryPlaceDetail status: ' + data.status);
        placeDetail = this.parseJsonToPlaceDetailObject(data.data)
    });

    return placeDetail;
  }

  public getUserLocation(): {lat: number, lng:number} {
    this.queryGeoLocation();
    return this.currLocation;
  }
}
