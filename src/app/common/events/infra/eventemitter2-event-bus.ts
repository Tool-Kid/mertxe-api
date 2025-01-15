import { Injectable } from '@nestjs/common';
import { EventBus } from '../domain/event-bus';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Event } from '../domain/event';

@Injectable()
export class EventEmitter2EventBus implements EventBus {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async emit(eventName: string, event: Event): Promise<any> {
    const results = await this.eventEmitter.emitAsync(eventName, event);
    return results.at(0);
  }
}
