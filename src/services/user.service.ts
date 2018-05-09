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

  static readonly USER_DETAILS_PATH = `${environment.baseURL}/user`;
  static readonly ACTIVE_USERS_PATH = `${environment.baseURL}/user/people`;

  constructor(public http: HttpClient) {
    console.log('Hello UserService Provider');
  }

  getUserDetails() {
    console.log("Requested logged user details from server");
    return this.http.get<User>(UserService.USER_DETAILS_PATH);
  }

  getActiveUsers() {
    console.log("Requested active users list from server");
    return this.http.get<User[]>(UserService.ACTIVE_USERS_PATH);
  }

  updateUserDetails(user: User) {
    console.log("Updating user details on server");
    return this.http.put<User>(UserService.USER_DETAILS_PATH, user);
    // return this.http.put<User>(`${UserService.USER_DETAILS_PATH}/${user.id}`, user);
  }

  getLocation() {

  }

}
