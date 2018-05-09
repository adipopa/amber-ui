export class BusyTime {

  public startDate: string;
  public startTime: string;
  public endDate: string;
  public endTime: string;

  constructor(busyTime: any = {}) {
    this.startDate = busyTime.startDate || '';
    this.startTime = busyTime.startTime || '';
    this.endDate = busyTime.endDate || '';
    this.endTime = busyTime.endTime || '';
  }
}
