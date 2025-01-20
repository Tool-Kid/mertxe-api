import { Event } from '@common/ddd';

export class ScoringRecordAddedEvent extends Event {
  constructor(readonly points: number) {
    super(points);
  }
}
