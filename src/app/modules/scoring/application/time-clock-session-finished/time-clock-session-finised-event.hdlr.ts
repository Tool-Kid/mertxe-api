import { ScoringRecordsRepository } from '../../domain/scoring-records.repo';
import { RegisterScoringRecord } from '../../domain/types/register';
import { TimeClockScoringRecord } from '../../domain/types/time-clock';
import { TimeClockSessionFinished } from 'src/app/modules/time-clock/domain/time-clock-session-finished.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(TimeClockSessionFinished)
export class TimeClockSessionFinishedEventHandler
  implements IEventHandler<TimeClockSessionFinished>
{
  constructor(
    private readonly scoringRecordsRepository: ScoringRecordsRepository
  ) {}

  async handle(event: TimeClockSessionFinished) {
    const scoringRecord = new RegisterScoringRecord();
    const record = new TimeClockScoringRecord(
      event.clockInAt,
      event.clockOutAt
    );
    await this.scoringRecordsRepository.addScoringRecord(record);
    return scoringRecord.getRaw();
  }
}
