import { EventsHandler, IEventsHandler } from '@common/events';
import { ScoringRecordsRepository } from '../../domain/scoring-records.repo';
import { RegisterScoringRecord } from '../../domain/types/register';
import { TimeClockScoringRecord } from '../../domain/types/time-clock';
import { TimeClockSessionFinished } from 'src/app/modules/time-clock/domain/time-clock-session-finished.event';

@EventsHandler(TimeClockSessionFinished)
export class TimeClockSessionFinishedEventHandler
  implements IEventsHandler<TimeClockSessionFinished, any>
{
  constructor(
    private readonly scoringRecordsRepository: ScoringRecordsRepository
  ) {}

  async execute(event: TimeClockSessionFinished) {
    const scoringRecord = new RegisterScoringRecord();
    const record = new TimeClockScoringRecord(
      event.clockInAt,
      event.clockOutAt
    );
    await this.scoringRecordsRepository.addScoringRecord(record);
    return scoringRecord.getRaw();
  }
}
