import { Event } from '@common/ddd';
import { APP_EVENTS } from '@common/events';

export class TimeClockSessionFinished extends Event {
  constructor(
    readonly data: { clockInAt: string; readonly clockOutAt: string }
  ) {
    super(APP_EVENTS.TIME_CLOCK__SESSION_FINISHED, data);
  }
}
