import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AboutPage } from './about/about';
import { TabsPage } from './tabs/tabs';
import { ContactPage } from './contact/contact';
import { HomePage } from './home/home';


@NgModule({
  declarations: [
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
  ],
  entryComponents: [
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ]
})
export class CoreModule {}
