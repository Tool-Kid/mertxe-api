import { UserRegisteredEvent } from '../../auth/domain/user-registered.event';
import { ScoringRecordsRepository } from '../domain/scoring-records.repo';
import { RegisterScoringRecord } from '../domain/types/register';
import { EventsHandler, IEventsHandler } from '@common/events';

@EventsHandler(UserRegisteredEvent)
export class UserRegisteredEventHandler
  implements IEventsHandler<UserRegisteredEvent, any>
{
  constructor(
    private readonly scoringRecordsRepository: ScoringRecordsRepository
  ) {}

  async execute(event: UserRegisteredEvent) {
    const scoringRecord = new RegisterScoringRecord();
    await this.scoringRecordsRepository.addRegisterScoringRecord();
    return scoringRecord.getRaw();
  }
}
