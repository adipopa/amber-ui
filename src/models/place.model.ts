export class Place {

  public name: string; // Eis Caffe <-
  public address: string; // Lotus 19, Turda, Cluj
  public lat: number; // 352352
  public lng: number; // 421321
  public thumbnail: File;

  constructor(place: any = {}) {
    this.name = place.name || '';
    this.address = place.address || '';
    this.lat = place.lat || 0;
    this.lng = place.lng || 0;
    this.thumbnail = place.thumbnail || null;
  }
}
