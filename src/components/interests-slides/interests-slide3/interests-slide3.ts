import { Component, Input } from '@angular/core';

import { User } from '@models/user.model';
import { Interest } from '@models/interest.model';

/**
 * Generated class for the InterestsSlide3Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'interests-slide3',
  templateUrl: 'interests-slide3.html'
})
export class InterestsSlide3Component {

  @Input() userDetails: User = new User();
  @Input() selectedInterests: Interest[] = [];

  constructor() {
    console.log('Hello InterestsSlide3Component Component');
  }

}
