import { Event as Event$, EventResult } from 'modules/core/src/lib/ddd';

export abstract class EventBus {
  abstract publish<Event extends Event$>(event: Event): Promise<EventResult>;
}
