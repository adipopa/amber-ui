import { Interest } from '@models/interest.model';

export class User {

  public id: number;
  public username: string;
  public firstName: string;
  public lastName: string;
  public age: string;
  public bio: string;
  public profileImg: string;
  public interests: Interest[];
  public firstLogin: boolean;

  constructor(user: any = {}) {
    this.id = user.id || 0;
    this.username = user.username || '';
    this.firstName = user.firstName || '';
    this.lastName = user.lastName || '';
    this.age = user.age || '';
    this.bio = user.bio || '';
    this.profileImg = user.profileImg || '';
    this.mapInterests(user.interests);
    this.firstLogin = user.firstLogin || false;
  }

  mapInterests(interests = []) {
    this.interests = interests.map(interest => new Interest(interest));
  }

}
