import { Component, Input } from '@angular/core';

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

  constructor() {
    console.log('Hello EventCardComponent Component');

  }

}
