import { Event } from '@common/ddd';
import { APP_EVENTS } from '@common/events';

export class ScoringRecordAddedEvent extends Event {
  constructor(readonly data: { points: number }) {
    super(APP_EVENTS.SCORING.RECORD_ADDED, data);
  }
}
