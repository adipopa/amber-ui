import { Component, EventEmitter, Output } from '@angular/core';

import { Interest } from '@models/interest.model';
import { Option } from '@models/option.model';

import { InterestsService } from '@services/interests.service';

/**
 * Generated class for the InterestsSlide2Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'interests-slide2',
  templateUrl: 'interests-slide2.html'
})
export class InterestsSlide2Component {

  @Output() selectedInterestsChange: EventEmitter<Interest[]> = new EventEmitter();

  public interests: Interest[] = [];

  constructor(private interestsService: InterestsService) {
    console.log('Hello InterestsSlide2Component Component');
    this.populateInterests();
  }

  populateInterests() {
    this.interestsService.getAllInterests().subscribe(
      (interests) => {
        for (let category in interests) {
          let newInterest = new Interest();
          newInterest.category = category;
          interests[category].forEach(label => {
            let newOption = new Option();
            newOption.label = label;
            newInterest.options.push(newOption);
          });
          this.interests.push(newInterest);
        }
        console.log(this.interests);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSelectOption(interest: Interest, option: Option) {
    let interestIndex = this.interests.indexOf(interest);
    let optionIndex = this.interests[interestIndex].options.indexOf(option);
    this.interests[interestIndex].options[optionIndex].isSelected = true;
    this.onSelectionChange();
  }

  onRemoveOption(interest: Interest, option: Option) {
    let interestIndex = this.interests.indexOf(interest);
    let optionIndex = this.interests[interestIndex].options.indexOf(option);
    this.interests[interestIndex].options[optionIndex].isSelected = false;
    this.onSelectionChange();
  }

  onSelectionChange() {
    let selectedInterests: Interest[] = [];
    this.interests.forEach(interest => {
      let selectedInterest = new Interest;
      selectedInterest.category = interest.category;
      selectedInterest.options = interest.options.filter(option => option.isSelected);
      if(selectedInterest.options.length > 0) {
        selectedInterests.push(selectedInterest);
      }
    });
    this.selectedInterestsChange.emit(selectedInterests);
  }

}
