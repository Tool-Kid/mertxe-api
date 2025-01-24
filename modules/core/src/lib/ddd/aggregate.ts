import { Aggregate as DDDAggreagte } from 'types-ddd';
import { Event } from './event';

export class Aggregate<Props> extends DDDAggreagte<Props> {
  private events: Event[] = [];

  pullEvents(): Event[] {
    const events = [...this.events];
    this.events = [];
    return events;
  }

  protected registerEvent(event: Event) {
    this.events.push(event);
  }
}
