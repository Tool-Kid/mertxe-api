import { Event } from '@mertxe/core';
import { APP_EVENTS } from '@mertxe/core';

export class ScoringRecordAddedEvent extends Event {
  constructor(readonly data: { points: number }) {
    super(APP_EVENTS.SCORING.RECORD_ADDED, data);
  }
}
