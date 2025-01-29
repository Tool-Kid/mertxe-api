export abstract class Notification<Data> {
  readonly data: Data;
  readonly name: string;
  protected constructor(data: Data) {
    this.name = this.constructor.name;
    this.data = data;
  }
}
