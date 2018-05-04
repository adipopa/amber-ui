import { User } from './user.model';
import { BusyTime } from './busytime.model';

export class Event {

  public id: number;
  public name: string;
  public address: string;
  public busyTime: BusyTime;
  public lat: number;
  public lng: number;
  public users: User[];

  constructor(event: any = {}) {
    this.id = event.id || 0;
    this.name = event.name || '';
    this.address = event.address || '';
    this.busyTime = Event.mapBusyTime(event.busyTime);
    this.lat = event.lat || 0;
    this.lng = event.lng || 0;
    this.mapUsers(event.users);
  }

  static mapBusyTime(busyTime = {}) {
    return new BusyTime(busyTime || {});
  }

  mapUsers(users = []) {
    this.users = users.map(user => new User(user));
  }
}
