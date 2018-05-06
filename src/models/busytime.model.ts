export class BusyTime {

  public startDate: number;
  public endDate: number;

  constructor(busyTime: any = {}) {
    this.startDate = busyTime.startDate || 0;
    this.endDate = busyTime.endDate || 0;
  }
}
