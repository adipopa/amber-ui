import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

import { environment } from '@app/environment'

/*
  Generated class for the AuthService provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthService {

  static readonly USER_TOKEN_KEY = 'user_token';
  static readonly API_LOGIN_BASE_PATH = `${environment.baseURL}/auth`;
  static readonly API_REGISTER_BASE_PATH = `${environment.baseURL}/register`;

  constructor(public http: HttpClient) {
    console.log('Hello AuthService Provider');
  }

  register(user: any) {
    return this.http.post(`${AuthService.API_REGISTER_BASE_PATH}`, user)
      .map(response => {
        return response;
      });
  }

  login(user: any) {
    return this.http.post(`${AuthService.API_LOGIN_BASE_PATH}`, user)
      .map(response => {
        AuthService.handleLoginSuccess(response);
        return response;
      });
  }

  static handleLoginSuccess(data) {
    AuthService.storeToken(data["access_token"]);
  }

  static storeToken(token: string): void {
    localStorage.setItem(AuthService.USER_TOKEN_KEY, token);
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  // public isAuthenticated(): boolean {
  //   // get the token
  //   const token = AuthService.getToken();
  //   // return a boolean reflecting
  //   // whether or not the token is expired
  //   return tokenNotExpired(null, token);
  // }

  logout() {
    localStorage.removeItem(AuthService.USER_TOKEN_KEY);
  }
}
