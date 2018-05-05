import { User } from './user.model';
import { BusyTime } from './busytime.model';
import { Place } from './place.model';

export class Event {

  public id: number;
  public name: string;
  public busyTime: BusyTime;
  public place: Place;
  public users: User[];

  constructor(event: any = {}) {
    this.id = event.id || 0;
    this.name = event.name || '';
    this.busyTime = Event.mapBusyTime(event.busyTime);
    this.mapUsers(event.users);
  }

  static mapBusyTime(busyTime = {}) {
    return new BusyTime(busyTime || {});
  }

  mapUsers(users = []) {
    this.users = users.map(user => new User(user));
  }
}
