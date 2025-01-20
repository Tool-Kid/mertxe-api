export class Event {
  readonly name: string;
  readonly data: object;

  constructor(data: object) {
    this.name = this.constructor.name;
    this.data = data;
  }
}
