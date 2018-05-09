import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { IntroPage } from './intro/intro';
import { LoginPage } from './login/login';
import { RegisterPage } from './register/register';

import { AuthService } from '@services/auth.service';

@NgModule({
  declarations: [
    IntroPage,
    LoginPage,
    RegisterPage
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    HttpClientModule
  ],
  entryComponents: [
    IntroPage,
    LoginPage,
    RegisterPage
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule {}
