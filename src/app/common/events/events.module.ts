import { DynamicModule, Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBus } from './event-bus';

@Module({})
@Global()
export class EventsModule {
  static forRoot(): DynamicModule {
    return {
      module: EventsModule,
      imports: [CqrsModule],
      providers: [EventBus],
      exports: [EventBus],
    };
  }
}
