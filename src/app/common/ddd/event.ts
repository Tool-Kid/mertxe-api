export class Event {
  readonly name: string;
  readonly data: any;

  constructor(data: any) {
    this.name = this.constructor.name;
    this.data = data;
  }
}
