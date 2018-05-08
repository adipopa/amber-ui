export class Message {

  public userId: number;
  public eventId: number;
  public msg: string;
  public name: string;

  constructor(message: any = {}) {
    this.userId = message.userId || 0;
    this.eventId = message.eventId || 0;
    this.msg = message.msg || '';
    this.name = message.name || '';
  }
}
