import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';

import { InterestsPage } from '@pages/core/interests/interests';
import { TabsPage } from '@pages/core/tabs/tabs';

import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private registerForm: FormGroup;

  private registerError: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
              private authService: AuthService, private userService: UserService) {

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');

    this.registerError = false;
  }

  onRegister() {
    const userDetails = this.registerForm.value;
    this.authService.register(userDetails).subscribe(
      (data: any) => {
        this.proceedToLogin(userDetails);
      },
      (error: any) => {
        this.registerError = true;
      });
  }

  proceedToLogin(userDetails) {
    this.authService.login(userDetails).subscribe(
      (data: any) => {
        this.resolveNextPage();
      },
      (error: any) => {
        this.navCtrl.pop();
        this.navCtrl.push(LoginPage);
      });
  }

  resolveNextPage() {
    this.userService.getUserDetails().subscribe(
      (user) => {
        if (user.firstLogin) {
          this.navCtrl.setRoot(InterestsPage, null, {animate: true, direction: 'forward'});
        } else {
          this.navCtrl.setRoot(TabsPage, null, {animate: true, direction: 'forward'});
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
