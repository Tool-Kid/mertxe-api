import { ScoringRecord } from '../scoring-record';
import { ScoringRecordReason } from '../scoring-record-reason';

export class TimeClockScoringRecord extends ScoringRecord {
  constructor(clockInAt: string, clockOutAt: string) {
    super({
      reason: ScoringRecordReason.TIME_CLOCK,
      amount: null,
    });
    const amount = this.computeAmount(clockInAt, clockOutAt);
    this.set('amount').to(amount);
  }

  private computeAmount(clockInAt: string, clockOutAt: string): number {
    const clockInDate = new Date(clockInAt);
    const clockOutDate = new Date(clockOutAt);

    const diffMs = clockOutDate.getTime() - clockInDate.getTime();
    const diffMinutes = diffMs / (1000 * 60);

    return Math.floor(diffMinutes / 30) * 5;
  }
}
