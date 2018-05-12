import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Toast, ToastController } from 'ionic-angular';

/*
  Generated class for the ToastService provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToastService {

  private networkErrorToast: Toast;
  private locationErrorToast: Toast;

  constructor(public http: HttpClient, private toastCtrl: ToastController) {
    console.log('Hello ToastService Provider');
  }

  showToast(message: string, position: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: position
    });

    toast.present();
  }

  presentLocationErrorToast() {
    if (this.locationErrorToast == null && this.networkErrorToast == null) {
      this.locationErrorToast = this.toastCtrl.create({
        message: 'Location unavailable, retrying...',
        position: 'bottom'
      });
      this.locationErrorToast.present();
    }
  }

  dismissLocationErrorToast() {
    if (this.locationErrorToast != null) {
      this.locationErrorToast.dismiss();
      this.locationErrorToast = null;
    }
  }

  presentNetworkErrorToast() {
    if (this.networkErrorToast == null) {
      this.networkErrorToast = this.toastCtrl.create({
        message: 'Network connection unavailable, retrying...',
        position: 'bottom'
      });
      this.networkErrorToast.present();
    }
  }

  dismissNetworkErrorToast() {
    if (this.networkErrorToast != null) {
      this.networkErrorToast.dismiss();
      this.networkErrorToast = null;
    }
  }
}
