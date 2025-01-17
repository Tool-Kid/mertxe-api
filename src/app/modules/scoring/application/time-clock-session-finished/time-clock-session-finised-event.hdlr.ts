import { EventBus, EventsHandler, IEventsHandler } from '@common/events';
import { ScoringRecordsRepository } from '../../domain/scoring-records.repo';
import { TimeClockScoringRecord } from '../../domain/types/time-clock';
import { TimeClockSessionFinished } from 'src/app/modules/time-clock/domain/time-clock-session-finished.event';
import { ScoringRecordAddedEvent } from '@modules/scoring/domain/scoring-record-added.event';
import { ScoringRecord } from '@modules/scoring/domain/scoring-record';

@EventsHandler(TimeClockSessionFinished)
export class TimeClockSessionFinishedEventHandler
  implements IEventsHandler<TimeClockSessionFinished, ScoringRecord>
{
  constructor(
    private readonly scoringRecordsRepository: ScoringRecordsRepository,
    private readonly eventBus: EventBus
  ) {}

  async execute(event: TimeClockSessionFinished) {
    const record = new TimeClockScoringRecord(
      event.clockInAt,
      event.clockOutAt
    );
    const scoringRecord = await this.scoringRecordsRepository.addScoringRecord(
      record
    );
    await this.eventBus.publish(
      new ScoringRecordAddedEvent(scoringRecord.get('amount'))
    );
    return scoringRecord;
  }
}
