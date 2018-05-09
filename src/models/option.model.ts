export class Option {

  public label: string;
  public isSelected: boolean;

  constructor(option: any = {}) {
    this.label = option.label || '';
    this.isSelected = option.isSelected || false;
  }
}
