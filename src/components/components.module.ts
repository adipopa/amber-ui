import { NgModule } from '@angular/core';

import { IonicModule } from 'ionic-angular';

import { HeaderComponent } from './header/header';
import { ChipComponent } from './chip/chip';
import {
  InterestsSlide1Component,
  InterestsSlide2Component,
  InterestsSlide3Component
} from '@components/interests-slides';

@NgModule({
	declarations: [
	  HeaderComponent,
    ChipComponent,
    InterestsSlide1Component,
    InterestsSlide2Component,
    InterestsSlide3Component,
  ],
  imports: [
    IonicModule
  ],
	exports: [
	  HeaderComponent,
    ChipComponent,
    InterestsSlide1Component,
    InterestsSlide2Component,
    InterestsSlide3Component,
  ]
})
export class ComponentsModule {}
