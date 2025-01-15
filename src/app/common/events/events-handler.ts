import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

export const EventsHandler = CommandHandler;
export type IEventsHandler<Event, Result> = ICommandHandler<Event, Result>;
