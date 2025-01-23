import { EventBus, EventHandler, IEventHandler } from '@common/events';
import { ScoringRecordsRepository } from '../../domain/scoring-records.repo';
import { TimeClockScoringRecord } from '../../domain/types/time-clock';
import { ScoringRecordReason } from '@modules/scoring/domain/scoring-record-reason';
import { APP_EVENTS } from '@common/events';

@EventHandler(APP_EVENTS.TIME_CLOCK__SESSION_FINISHED)
export class TimeClockSessionFinishedEventHandler
  implements IEventHandler<any, any>
{
  constructor(
    private readonly scoringRecordsRepository: ScoringRecordsRepository,
    private readonly eventBus: EventBus
  ) {}

  async handle(event: any): Promise<any> {
    const record = await TimeClockScoringRecord.createForReason(
      ScoringRecordReason.TIME_CLOCK,
      {
        clockInAt: event.data.clockInAt,
        clockOutAt: event.data.clockOutAt,
      }
    );
    const scoringRecord = await this.scoringRecordsRepository.addScoringRecord(
      record
    );

    const events = record.pullEvents();
    for (const event of events) {
      await this.eventBus.publish(event);
    }

    return scoringRecord;
  }
}
