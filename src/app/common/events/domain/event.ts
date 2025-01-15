interface EventProps {
  type: string;
  createdAt: string;
}

export class Event implements EventProps {
  readonly type: string;
  readonly createdAt: string;
  constructor(type: string) {
    this.type = type;
    this.createdAt = new Date().toString();
  }
}
