import { Event as Event$, EventResult } from '@common/ddd';

export abstract class EventBus {
  abstract publish<Event extends Event$>(event: Event): Promise<EventResult>;
}
