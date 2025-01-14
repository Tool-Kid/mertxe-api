import { ScoringRecordReason } from './scoring-record-reason';

interface ScoringRecordProps {
  id: number;
  createdAt: string;
  amount: number;
  reason: ScoringRecordReason;
}

export class ScoringRecord implements ScoringRecordProps {
  readonly id: number;
  readonly createdAt: string;
  readonly amount: number;
  readonly reason: ScoringRecordReason;

  constructor(props: ScoringRecordProps) {
    this.id = props.id;
    this.createdAt = props.createdAt;
    this.amount = props.amount;
    this.reason = props.reason;
  }
}
