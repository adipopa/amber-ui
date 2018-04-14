import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { LoginPage } from './login/login';
import { RegisterPage } from './register/register';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    LoginPage,
    RegisterPage
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
  entryComponents: [
    LoginPage,
    RegisterPage
  ],
  providers: [
    AuthGuard,
    AuthService
  ]
})
export class AuthModule {}
