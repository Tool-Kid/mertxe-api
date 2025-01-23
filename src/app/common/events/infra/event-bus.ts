import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Event as Event$, EventResult } from '@common/ddd';

@Injectable()
export class EventEmitter2EventBus {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async publish<Event extends Event$>(event: Event): Promise<EventResult> {
    const result = await this.eventEmitter.emitAsync(event.name, event.data);
    return new EventResult(event.name, result);
  }
}
