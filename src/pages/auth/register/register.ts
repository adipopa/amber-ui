import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';

import { AuthService } from '../auth.service';

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

  private registerError = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private formBuilder: FormBuilder, private authService: AuthService) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  onRegister() {
    const userDetails = this.registerForm.value;

    this.authService.register(userDetails).subscribe(
      (data: any) => {
        this.navCtrl.pop();
        this.navCtrl.push(LoginPage, userDetails);
      },
      (error: any) => {
        this.registerError = true;
      });

    console.log(userDetails)
  }

}
