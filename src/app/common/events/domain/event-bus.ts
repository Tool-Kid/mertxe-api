import { Event } from './event';

export abstract class EventBus {
  abstract emit(eventName: string, event: Event): Promise<any>;
}
