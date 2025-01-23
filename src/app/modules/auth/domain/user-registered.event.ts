import { Event } from '@common/ddd';
import { APP_EVENTS } from '@common/events';

export class UserRegisteredEvent extends Event {
  constructor(readonly data: { userId: string }) {
    super(APP_EVENTS.AUTH.USER_REGISTERED, data);
  }
}
