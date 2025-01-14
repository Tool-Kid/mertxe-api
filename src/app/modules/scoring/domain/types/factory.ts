import { ScoringRecord } from '../scoring-record';
import { ScoringRecordReason } from '../scoring-record-reason';
import { TimeClockScoringRecord } from './time-clock';

export class ScoringRecordFactory {
  static build(reason: ScoringRecordReason, data: any): ScoringRecord {
    switch (reason) {
      case ScoringRecordReason.TIME_CLOCK:
        return new TimeClockScoringRecord(data.clockInAt, data.clockOutAt);
      case ScoringRecordReason.REGISTER:
        return new ScoringRecord({
          reason,
          amount: 1000,
        });
    }
  }
}
