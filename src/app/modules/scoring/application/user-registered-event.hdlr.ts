import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserRegisteredEvent } from '../../auth/domain/user-registered.event';
import { ScoringRecordsRepository } from '../domain/scoring-records.repo';
import { RegisterScoringRecord } from '../domain/types/register';

@EventsHandler(UserRegisteredEvent)
export class UserRegisteredEventHandler
  implements IEventHandler<UserRegisteredEvent>
{
  constructor(
    private readonly scoringRecordsRepository: ScoringRecordsRepository
  ) {}

  async handle(event: UserRegisteredEvent) {
    const scoringRecord = new RegisterScoringRecord();
    await this.scoringRecordsRepository.addRegisterScoringRecord(event.userId);
    return scoringRecord.getRaw();
  }
}
