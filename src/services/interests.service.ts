import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

import { environment } from '@environment';
/*
  Generated class for the UserService provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InterestsService {

  static readonly GET_INTERESTS_PATH = environment.baseURL + '/interests';

  constructor(public http: HttpClient) {
    console.log('Hello InterestsService Provider');
  }

  getAllInterests() {
    console.log("Requested interests list from server");
    return this.http.get(InterestsService.GET_INTERESTS_PATH);
  }

}
