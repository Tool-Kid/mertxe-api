import { Event } from '@mertxe/core';
import { APP_EVENTS } from '@mertxe/core';

export class UserRegisteredEvent extends Event {
  constructor(readonly data: { userId: string }) {
    super(APP_EVENTS.AUTH.USER_REGISTERED, data);
  }
}
