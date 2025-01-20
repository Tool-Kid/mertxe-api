import { Event } from '@common/ddd';

export class UserRegisteredEvent extends Event {
  constructor(readonly data: { userId: string }) {
    super(data);
  }
}
