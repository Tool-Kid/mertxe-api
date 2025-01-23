import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Event as Event$ } from '@common/ddd';
@Injectable()
export class EventBus {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async publish<Event extends Event$>(event: Event): Promise<any> {
    const result = await this.eventEmitter.emitAsync(event.name, event.data);
    return result;
  }
}
