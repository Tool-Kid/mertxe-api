import { Aggregate } from '@mertxe/core';

interface TimeClockRecordProps {
  id?: number;
  userId?: string;
  clockInAt?: string;
  clockOutAt?: string;
}

export class TimeClockRecord extends Aggregate<TimeClockRecordProps> {}
