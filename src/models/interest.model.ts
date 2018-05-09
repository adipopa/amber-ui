import { Option } from '@models/option.model';

export class Interest {

  public category: string;
  public options: Option[];

  constructor(interest: any = {}) {
    this.category = interest.category;
    this.mapOptions(interest.options);
  }

  mapOptions(options = []) {
    this.options = options.map(option => new Option(option));
  }
}
