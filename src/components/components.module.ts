import { NgModule } from '@angular/core';

import { IonicModule } from 'ionic-angular';

import { HeaderComponent } from './header/header';
import {
InterestsSlide1Component,
InterestsSlide2Component,
InterestsSlide3Component
} from '@components/interests-slides';
import { ChipComponent } from './chip/chip';
import { EventCardComponent } from './event-card/event-card';

@NgModule({
	declarations: [
	  HeaderComponent,
    InterestsSlide1Component,
    InterestsSlide2Component,
    InterestsSlide3Component,
    ChipComponent,
    EventCardComponent,
  ],
  imports: [
    IonicModule
  ],
	exports: [
	  HeaderComponent,
    InterestsSlide1Component,
    InterestsSlide2Component,
    InterestsSlide3Component,
    ChipComponent,
    EventCardComponent,
  ]
})
export class ComponentsModule {}
