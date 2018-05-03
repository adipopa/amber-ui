export class User {

  public id: number;
  public email: string;
  public firstName: string;
  public lastName: string;
  public age: string;
  public bio: string;
  public profileImg: string;
  public interests: string[];
  public firstLogin: boolean;

  constructor(user: any = {}) {
    this.id = user.id || 0;
    this.email = user.email || '';
    this.firstName = user.firstName || '';
    this.lastName = user.lastName || '';
    this.age = user.age || '';
    this.bio = user.bio || '';
    this.profileImg = user.profileImg || '';
    this.mapInterests(user.interests);
    this.firstLogin = user.firstLogin || false;
  }

  mapInterests(interests = []) {
    this.interests = interests.map(interest => String(interest));
  }

}
