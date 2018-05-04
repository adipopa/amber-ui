export class BusyTime {

  public startDate: string;
  public endDate: string;

  constructor(busyTime: any = {}) {
    this.startDate = busyTime.startDate;
    this.endDate = busyTime.endDate;
  }
}
