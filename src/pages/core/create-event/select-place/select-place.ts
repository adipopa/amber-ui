import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

import { Place } from '@models/place.model';

import { PlaceService } from '@services/place.service';

import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

declare var google;

/**
 * Generated class for the SelectPlacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-select-place',
  templateUrl: 'select-place.html',
})
export class SelectPlacePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  public nearbyPlaces: Place[] = [];

  private nearbyPlacesSubscription: Subscription;

  public locationSubject: Subject<Place> = new Subject<Place>();

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private placeService: PlaceService, private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectPlacePage');
    this.nearbyPlacesSubscription = this.placeService.nearbyPlacesSubject.subscribe(
      (places) => {
        this.nearbyPlaces = places;
        this.loadMap();
        this.nearbyPlacesSubscription.unsubscribe();
      }
    );
    this.placeService.queryPlaces();
  }

  onSelectPlace(place: Place) {
    this.locationSubject.next(place);
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.nearbyPlaces.forEach((place) => {
        this.addMarker(place);
      });

    }).catch(error => {
      console.log(error)
    });

  }

  addMarker(place: Place) {
    let latLng = new google.maps.LatLng(place.lat, place.lng);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
    });

    let content = `
      <h4>${place.name}</h4>
      <p>${place.address}</p><br>
      <img src="${place.thumbnail}" style="width: 200px; height: 100px; object-fit: cover">
    `;

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    this.addClickListener(place, marker, infoWindow);
  }

  addClickListener(place, marker, infoWindow){
    google.maps.event.addListener(marker, 'click', () => {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
      infoWindow.open(this.map, marker);
    });
  }
}
