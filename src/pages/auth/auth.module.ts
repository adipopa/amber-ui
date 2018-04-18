import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { IntroPage } from './intro/intro';
import { LoginPage } from './login/login';
import { RegisterPage } from './register/register';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';

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
    AuthGuard,
    AuthService
  ]
})
export class AuthModule {}
