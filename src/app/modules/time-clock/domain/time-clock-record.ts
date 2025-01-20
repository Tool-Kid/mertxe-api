import { Aggregate } from '@common/ddd';

interface TimeClockRecordProps {
  id?: number;
  userId?: string;
  clockInAt?: string;
  clockOutAt?: string;
}

export class TimeClockRecord extends Aggregate<TimeClockRecordProps> {}
