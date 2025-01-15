import { Event } from '@common/events/domain/event';
import { EVENTS } from '@common/events/events';

interface UserRegisteredEventProps {
  id: string;
  email: string;
  password: string;
}

export class UserRegisteredEvent extends Event {
  readonly userId: string;
  readonly props: UserRegisteredEventProps;
  constructor(props: UserRegisteredEventProps) {
    super(EVENTS.USER_REGISTERED);
    this.props = props;
  }
}
