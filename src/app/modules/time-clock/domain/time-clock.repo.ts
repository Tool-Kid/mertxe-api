import { TimeClockRecord } from './time-clock-record';

export abstract class TimeClockRepository {
  abstract clockIn(): Promise<TimeClockRecord>;
  abstract clockOut(): Promise<TimeClockRecord>;
  abstract getTimeClockRecords(): Promise<TimeClockRecord[]>;
}
