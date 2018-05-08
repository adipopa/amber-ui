import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TabsPage } from './tabs/tabs';

import { FeedPage } from './feed/feed';
import { GoingPage } from './going/going';
import { NotificationsPage } from './notifications/notifications';
import { PeoplePage } from './people/people';

import { InterestsPage } from './interests/interests';
import { ProfilePage } from './profile/profile';

import { CreateEventPage } from './create-event/create-event';
import { SelectPlacePage } from './create-event/select-place/select-place';

import { ComponentsModule } from '@components/components.module';

@NgModule({
  declarations: [
    TabsPage,
    FeedPage,
    GoingPage,
    NotificationsPage,
    PeoplePage,
    InterestsPage,
    ProfilePage,
    CreateEventPage,
    SelectPlacePage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(TabsPage)
  ],
  entryComponents: [
    TabsPage,
    FeedPage,
    GoingPage,
    NotificationsPage,
    PeoplePage,
    InterestsPage,
    ProfilePage,
    CreateEventPage,
    SelectPlacePage
  ],
  providers: []
})
export class CoreModule {
}
