import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { TabsPage } from '../../core/tabs/tabs';

import { AuthService } from '@services/auth.service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private loginForm: FormGroup;

  private loginError: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private formBuilder: FormBuilder, private authService: AuthService) {

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

    this.loginError = false;
  }

  onLogin() {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe(
      (data: any) => {
        console.log(data);
        this.navCtrl.push(TabsPage);
      },
      (error: any) => {
        this.loginError = true;
      });
  }

  onForgotPassword() {

  }

}
