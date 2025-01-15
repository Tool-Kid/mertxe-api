import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class EventBus {
  constructor(private readonly bus: CommandBus) {}

  async publish<Event>(event: Event): Promise<any> {
    // const result = await this.bus.execute(event);
    return null;
  }
}
