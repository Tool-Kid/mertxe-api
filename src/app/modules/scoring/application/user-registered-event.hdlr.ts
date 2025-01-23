import { APP_EVENTS } from '@common/events';
import { ScoringRecordsRepository } from '../domain/scoring-records.repo';
import { RegisterScoringRecord } from '../domain/types/register';
import { EventHandler, IEventHandler } from '@common/events';

@EventHandler(APP_EVENTS.AUTH__USER_REGISTERED)
export class UserRegisteredEventHandler implements IEventHandler<any, any> {
  constructor(
    private readonly scoringRecordsRepository: ScoringRecordsRepository
  ) {}
  async handle(event: any): Promise<any> {
    const scoringRecord = new RegisterScoringRecord();
    await this.scoringRecordsRepository.addRegisterScoringRecord();
    return scoringRecord.getRaw();
  }
}
