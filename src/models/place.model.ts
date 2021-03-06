export class Place {

  public id: string;
  public name: string; // Eis Caffe <-
  public address: string; // Lotus 19, Turda, Cluj
  public lat: number; // 352352
  public lng: number; // 421321
  public type: string;
  public thumbnail: string;
  public marker: any;

  constructor(place: any = {}) {
    this.id = place.id || '';
    this.name = place.name || '';
    this.address = place.address || '';
    this.lat = place.lat || 0;
    this.lng = place.lng || 0;
    this.type = place.type || '';
    this.thumbnail = place.thumbnail || '';
    this.marker = place.marker || null;
  }
}
