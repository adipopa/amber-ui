import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Generated class for the ChipComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chip',
  templateUrl: 'chip.html'
})
export class ChipComponent {

  @Input() label: string;
  @Input() selectable: boolean;
  @Input() isSelected = false;

  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @Output() onRemove: EventEmitter<any> = new EventEmitter();

  constructor() {
    console.log('Hello ChipComponent Component');
  }

  select() {
    if (this.selectable) {
      this.isSelected = true;
      this.onSelect.emit();
    }
  }

  remove() {
    this.isSelected = false;
    this.onRemove.emit();
  }

}
