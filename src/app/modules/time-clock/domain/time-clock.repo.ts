import { ClockInRecord } from './clock-in-record';

export abstract class TimeClockRepository {
  abstract clockIn(): Promise<ClockInRecord>;
  abstract clockOut(): Promise<ClockInRecord>;
  abstract getClockInRecords(): Promise<ClockInRecord[]>;
}
