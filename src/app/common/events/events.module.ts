import { DynamicModule, Global, Module } from '@nestjs/common';
import { EventBus } from './event-bus';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({})
@Global()
export class EventsModule {
  static forRoot(): DynamicModule {
    return {
      module: EventsModule,
      imports: [EventEmitterModule.forRoot()],
      providers: [EventBus],
      exports: [EventBus],
    };
  }
}
