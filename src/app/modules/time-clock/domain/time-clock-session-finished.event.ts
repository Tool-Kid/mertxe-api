import { Event } from '@common/ddd';

export class TimeClockSessionFinished extends Event {
  constructor(
    readonly data: { clockInAt: string; readonly clockOutAt: string }
  ) {
    super(data);
  }
}
