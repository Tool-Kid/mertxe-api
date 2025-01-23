import { APP_EVENTS } from '@common/events';
import { ScoringRecordsRepository } from '../domain/scoring-records.repo';
import { RegisterScoringRecord } from '../domain/types/register';
import { EventsHandler, IEventsHandler } from '@common/events';

@EventsHandler(APP_EVENTS.AUTH__USER_REGISTERED)
export class UserRegisteredEventHandler implements IEventsHandler<any, any> {
  constructor(
    private readonly scoringRecordsRepository: ScoringRecordsRepository
  ) {}
  async handle(event: any): Promise<any> {
    const scoringRecord = new RegisterScoringRecord();
    await this.scoringRecordsRepository.addRegisterScoringRecord();
    return scoringRecord.getRaw();
  }
}
