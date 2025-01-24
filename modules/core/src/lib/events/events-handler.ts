import { Event as Event$ } from 'modules/core/src/lib/ddd';
import { OnEvent } from '@nestjs/event-emitter';

export interface IEventHandler<Event extends Event$, Response> {
  handle(event: Event): Promise<Response>;
}

export function EventHandler(eventName: string): ClassDecorator {
  return function (target: Function) {
    const handleMethod = target.prototype.handle;

    if (typeof handleMethod !== 'function') {
      throw new Error(
        `${target.name} should implements IEventHandler interface`
      );
    }

    Reflect.decorate(
      [OnEvent(eventName)],
      target.prototype,
      'handle',
      Object.getOwnPropertyDescriptor(target.prototype, 'handle')
    );
  };
}
