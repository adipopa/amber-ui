import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from '@models/user.model';

/**
 * Generated class for the InterestsSlide1Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'interests-slide1',
  templateUrl: 'interests-slide1.html'
})
export class InterestsSlide1Component {

  @Input() userDetails: User = new User();

  public personalInfoForm: FormGroup;

  constructor() {
    console.log('Hello InterestsSlide1Component Component');
    this.personalInfoForm = new FormGroup({
      firstName: new FormControl(this.userDetails.firstName, []),
      lastName: new FormControl(this.userDetails.lastName, []),
      age: new FormControl(this.userDetails.age, [Validators.max(135)]),
      bio: new FormControl(this.userDetails.bio, [])
    });
  }

}
