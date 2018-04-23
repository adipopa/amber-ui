import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { FeedPage } from './feed/feed';
import { GoingPage } from './going/going';
import { NotificationsPage } from './notifications/notifications';
import { PeoplePage } from './people/people';

import { ProfilePage } from './profile/profile';

import { TabsPage } from './tabs/tabs';

@NgModule({
  declarations: [
    FeedPage,
    GoingPage,
    NotificationsPage,
    PeoplePage,
    ProfilePage,
    TabsPage
  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
  ],
  entryComponents: [
    FeedPage,
    GoingPage,
    NotificationsPage,
    PeoplePage,
    ProfilePage,
    TabsPage
  ]
})
export class CoreModule {}
