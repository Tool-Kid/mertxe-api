import { Event } from '@mertxe/core';
import { APP_EVENTS } from '@mertxe/core';

export class TimeClockSessionFinished extends Event {
  constructor(
    readonly data: { clockInAt: string; readonly clockOutAt: string }
  ) {
    super(APP_EVENTS.TIMECLOCK.SESSION_FINISHED, data);
  }
}
