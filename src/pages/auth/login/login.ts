import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { InterestsPage } from '@pages/core/interests/interests';
import { TabsPage } from '@pages/core/tabs/tabs';

import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';
import { ToastService } from '@services/toast.service';

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

  public loginForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
              private authService: AuthService, private userService: UserService, private toastService: ToastService) {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (data: any) => {
          this.resolveNextPage();
        },
        (error: any) => {
          const message = 'Invalid credentials, please try again.';
          this.toastService.showToast(message, 'bottom');
        });
    }
    else {
      const message = 'Please complete the username and password.';
      this.toastService.showToast(message, 'bottom');
    }
  }

  onForgotPassword() {

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
