import { ScoringRecord } from '../scoring-record';
import { ScoringRecordReason } from '../scoring-record-reason';

export class ScoringRecordFactory {
  static async build(
    reason: ScoringRecordReason,
    data: any
  ): Promise<ScoringRecord> {
    switch (reason) {
      case ScoringRecordReason.TIME_CLOCK:
        return new (await import('./time-clock')).TimeClockScoringRecord(
          data.clockInAt,
          data.clockOutAt
        );
      case ScoringRecordReason.REGISTER:
        return new (await import('./register')).RegisterScoringRecord();
    }
  }
}
