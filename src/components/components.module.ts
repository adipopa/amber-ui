import { NgModule } from '@angular/core';

import { IonicModule } from 'ionic-angular';

import {
InterestsSlide1Component,
InterestsSlide2Component,
InterestsSlide3Component
} from '@components/interests-slides';
import { ChipComponent } from './chip/chip';
import { EventCardComponent } from './event-card/event-card';
import { EventPeoplePage } from '@components/event-card/event-people/event-people';

@NgModule({
	declarations: [
    InterestsSlide1Component,
    InterestsSlide2Component,
    InterestsSlide3Component,
    ChipComponent,
    EventCardComponent,
    EventPeoplePage
  ],
  imports: [
    IonicModule
  ],
  entryComponents: [
    EventPeoplePage
  ],
	exports: [
    InterestsSlide1Component,
    InterestsSlide2Component,
    InterestsSlide3Component,
    ChipComponent,
    EventCardComponent
  ]
})
export class ComponentsModule {}
