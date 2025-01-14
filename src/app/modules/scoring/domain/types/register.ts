import { ScoringRecord } from '../scoring-record';
import { ScoringRecordReason } from '../scoring-record-reason';

export class TimeClockScoringRecord extends ScoringRecord {
  constructor() {
    super({
      reason: ScoringRecordReason.TIME_CLOCK,
      amount: 1000,
    });
  }
}
