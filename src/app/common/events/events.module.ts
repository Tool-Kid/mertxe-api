import { Global, Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventBus } from './domain/event-bus';
import { EventEmitter2EventBus } from './infra/eventemitter2-event-bus';

@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [{ provide: EventBus, useClass: EventEmitter2EventBus }],
  exports: [EventBus],
})
@Global()
export class EventsModule {}
