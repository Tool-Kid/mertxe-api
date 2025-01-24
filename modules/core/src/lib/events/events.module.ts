import { DynamicModule, Global, Module } from '@nestjs/common';
import { EventEmitter2EventBus } from './infra/event-bus';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventBus } from './domain/event-bus';

@Module({})
@Global()
export class EventsModule {
  static forRoot(): DynamicModule {
    return {
      module: EventsModule,
      imports: [EventEmitterModule.forRoot()],
      providers: [{ provide: EventBus, useClass: EventEmitter2EventBus }],
      exports: [EventBus],
    };
  }
}
