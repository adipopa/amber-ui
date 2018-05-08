import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ToastController } from 'ionic-angular';

/*
  Generated class for the ToastService provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToastService {

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

}
