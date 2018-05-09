import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Event } from '@models/event.model';

/**
 * Generated class for the EventCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'event-card',
  templateUrl: 'event-card.html'
})
export class EventCardComponent {

  @Input() event: Event = new Event();
  @Input() isAvailable: boolean;

  @Output() onJoin: EventEmitter<any> = new EventEmitter<any>();
  @Output() onLeave: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() onPeople: EventEmitter<any> = new EventEmitter<any>();

  // TODO: Complete iconTypes
  public iconTypes = {
    restaurant: 'restaurant',
    cafe: 'cafe',
    bar: 'wine',
    gas_station: 'car',
    lodging: 'home',
    school: 'school'
  };

  constructor() {
    console.log('Hello EventCardComponent Component');
  }

  joinEvent() {
    this.onJoin.emit();
  }

  leaveEvent() {
    this.onLeave.emit();
  }

  deleteEvent() {
    this.onDelete.emit();
  }

  showPeople() {
    this.onPeople.emit();
  }

}
