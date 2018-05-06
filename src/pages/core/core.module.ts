import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { FeedPage } from './feed/feed';
import { GoingPage } from './going/going';
import { NotificationsPage } from './notifications/notifications';
import { PeoplePage } from './people/people';

import { InterestsPage } from './interests/interests';
import { ProfilePage } from './profile/profile';

import { CreateEventPage } from './create-event/create-event';
import { SelectPlacePage } from './create-event/select-place/select-place';

import { TabsPage } from './tabs/tabs';

import { ComponentsModule } from '@components/components.module';

import { AuthHeaderInterceptor } from '@interceptors/auth.interceptor';

@NgModule({
  declarations: [
    FeedPage,
    GoingPage,
    NotificationsPage,
    PeoplePage,
    InterestsPage,
    ProfilePage,
    CreateEventPage,
    SelectPlacePage,
    TabsPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(TabsPage)
  ],
  entryComponents: [
    FeedPage,
    GoingPage,
    NotificationsPage,
    PeoplePage,
    InterestsPage,
    ProfilePage,
    CreateEventPage,
    SelectPlacePage,
    TabsPage
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
}
