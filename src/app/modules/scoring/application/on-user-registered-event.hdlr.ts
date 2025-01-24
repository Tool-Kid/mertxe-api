import { APP_EVENTS } from '@mertxe/core';
import { ScoringRecordsRepository } from '../domain/scoring-records.repo';
import { RegisterScoringRecord } from '../domain/types/register';
import { EventHandler, IEventHandler } from '@mertxe/core';

@EventHandler(APP_EVENTS.AUTH.USER_REGISTERED)
export class OnUserRegisteredEventHandler implements IEventHandler<any, any> {
  constructor(
    private readonly scoringRecordsRepository: ScoringRecordsRepository
  ) {}
  async handle(event: any): Promise<any> {
    const scoringRecord = new RegisterScoringRecord();
    await this.scoringRecordsRepository.addRegisterScoringRecord();
    return scoringRecord.getRaw();
  }
}
