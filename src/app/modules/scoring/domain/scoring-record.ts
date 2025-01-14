import { Aggregate } from 'types-ddd';
import { ScoringRecordReason } from './scoring-record-reason';
import { ScoringRecordFactory } from './types/factory';

interface ScoringRecordProps {
  id?: number;
  createdAt?: string;
  amount: number;
  reason: ScoringRecordReason;
}

export class ScoringRecord extends Aggregate<ScoringRecordProps> {
  constructor(props: ScoringRecordProps) {
    super(props);
  }

  static createForReason(reason: ScoringRecordReason, data: any) {
    return ScoringRecordFactory.build(reason, data);
  }
}
