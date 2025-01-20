import { Event } from '@common/ddd';

export class ScoringRecordAddedEvent extends Event {
  constructor(readonly data: { points: number }) {
    super(data);
  }
}
