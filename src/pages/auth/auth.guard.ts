import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthGuard provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthGuard {

  canEnter = true;

  constructor(public http: HttpClient) {
    console.log('Hello AuthGuard Provider');
  }

  ionViewCanLeave(): boolean {
    // here we can either return true or false
    // depending on if we want to leave this view
    if (this.canEnter) {
      return true;
    } else {
      return false;
    }
  }
}
