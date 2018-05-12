import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

import { Place } from '@models/place.model';

import { PlaceService } from '@services/place.service';

import { ToastService } from '@services/toast.service';

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

  private selectedPlace: Place = new Place();

  public locationSubject: Subject<Place>;

  private lastInfoWindow = null;

  public isLoading = true;
  public loadingMap = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation,
              private placeService: PlaceService, private toastService: ToastService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectPlacePage');
    this.populateNearbyPlaces();
  }

  populateNearbyPlaces() {
    this.isLoading = true;
    this.nearbyPlacesSubscription = this.placeService.nearbyPlacesSubject.subscribe(
      (places) => {
        this.nearbyPlaces = places;
        this.nearbyPlaces.sort(function(a, b){
          if(a.name < b.name) return -1;
          if(a.name > b.name) return 1;
          return 0;
        });
        this.loadingMap = true;
        this.loadMap();
        this.isLoading = false;
        this.nearbyPlacesSubscription.unsubscribe();
      }
    );
    this.placeService.queryPlaces();
    this.locationSubject = this.navParams.get('locationSubject');
  }

  onSelectPlace(place: Place) {
    this.selectMarker(place);
  }

  loadMap() {
    this.geolocation.getCurrentPosition({timeout: 5000, enableHighAccuracy: true}).then((position) => {

      this.toastService.dismissLocationErrorToast();

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.nearbyPlaces.forEach((place) => {
        this.addMarker(place);
      });

      this.loadingMap = false;

    }).catch((error) => {
      console.log(error);
      this.toastService.presentLocationErrorToast();
      setTimeout(() => {
        this.loadMap();
      }, 3000);
    });

  }

  addMarker(place: Place) {
    let latLng = new google.maps.LatLng(place.lat, place.lng);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
    });

    place.marker = marker;

    let infoWindow = SelectPlacePage.getInfoWindow(place);

    this.addClickListener(place, marker, infoWindow);
  }

  selectMarker(place: Place) {
    if (place.marker != null) {
      let infoWindow = SelectPlacePage.getInfoWindow(place);

      this.showMarkerDetails(place.marker, infoWindow);
    }
  }

  addClickListener(place, marker, infoWindow){
    google.maps.event.addListener(marker, 'click', () => {
      this.selectedPlace = place;
      this.showMarkerDetails(marker, infoWindow);
    });
  }

  submitChoice() {
    this.selectedPlace.marker = null;
    this.locationSubject.next(this.selectedPlace);
    this.navCtrl.pop();
  }

  static getInfoWindow(place) {
    let content = `
      <div style="width: 210px; text-align: center">
        <h4>${place.name}</h4>
        <p>${place.address}</p><br>
    `;

    if (place.thumbnail.length > 0) {
      content += `<img src="${place.thumbnail}" style="width: 200px; height: 100px; object-fit: cover">`;
    }

    content += `</div>`;

    return new google.maps.InfoWindow({
      content: content
    });
  }

  showMarkerDetails(marker, infoWindow) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(() => {
      marker.setAnimation(null);
    }, 1000);

    if (this.lastInfoWindow != null) {
      this.lastInfoWindow.close();
    }

    infoWindow.open(this.map, marker);
    this.lastInfoWindow = infoWindow;
  }
}
