import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '@models/user.model';

import { environment } from '@environment';

/*
  Generated class for the UserService provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserService {

  static readonly USER_DETAILS_PATH = environment.baseURL + '/user';

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

  getUserDetails() {
    console.log("Requested logged user details from server");
    return this.http.get<User>(UserService.USER_DETAILS_PATH);
  }

}
