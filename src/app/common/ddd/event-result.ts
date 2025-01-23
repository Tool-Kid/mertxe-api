export class EventResult {
  readonly origin: string;
  readonly data: any;
  constructor(origin: string, result: any) {
    this.origin = origin;
    this.data = result;
  }
}
