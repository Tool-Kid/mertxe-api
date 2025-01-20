import { Aggregate } from '@common/ddd';
import { ScoringRecordReason } from './scoring-record-reason';
import { ScoringRecordFactory } from './types/factory';
import { ScoringRecordAddedEvent } from './scoring-record-added.event';

export interface ScoringRecordProps {
  id?: number;
  createdAt?: string;
  amount: number;
  reason: ScoringRecordReason;
}

export class ScoringRecord extends Aggregate<ScoringRecordProps> {
  constructor(props: ScoringRecordProps) {
    super(props);
  }

  static async createForReason(reason: ScoringRecordReason, data: any) {
    const record = await ScoringRecordFactory.build(reason, data);
    record.registerEvent(new ScoringRecordAddedEvent(record.get('amount')));
    return record;
  }
}
