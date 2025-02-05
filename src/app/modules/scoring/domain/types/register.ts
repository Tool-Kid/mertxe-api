import { ScoringRecord } from '../scoring-record';
import { ScoringRecordReason } from '../scoring-record-reason';

export class RegisterScoringRecord extends ScoringRecord {
  constructor() {
    super({
      reason: ScoringRecordReason.REGISTER,
      amount: 1000,
    });
  }
}
