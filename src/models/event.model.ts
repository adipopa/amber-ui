import { User } from './user.model';
import { BusyTime } from './busytime.model';
import { Place } from './place.model';

export class Event {

  public id: number;
  public title: string;
  public description: string;
  public dist: number;
  public eta: number;
  public busyTime: BusyTime;
  public place: Place;
  public users: User[];

  constructor(event: any = {}) {
    this.id = event.id || 0;
    this.title = event.title || '';
    this.description = event.description || '';
    this.dist = event.dist || 0;
    this.eta = event.eta || 0;
    this.busyTime = Event.mapBusyTime(event.busyTime);
    this.place = Event.mapPlace(event.place);
    this.mapUsers(event.users);
  }

  static mapBusyTime(busyTime = {}) {
    return new BusyTime(busyTime || {});
  }

  static mapPlace(place = {}) {
    return new Place(place || {});
  }

  mapUsers(users = []) {
    this.users = users.map(user => new User(user));
  }
}
