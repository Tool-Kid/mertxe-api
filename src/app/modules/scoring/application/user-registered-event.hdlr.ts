import { EventHandler } from '@common/events/domain/event-handler';
import { EVENTS } from '@common/events/events';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ScoringRecordsRepository } from '../domain/scoring-records.repo';
import { RegisterScoringRecord } from '../domain/types/register';

@Injectable()
export class UserRegisteredEventHandler implements EventHandler {
  constructor(
    private readonly scoringRecordsRepository: ScoringRecordsRepository
  ) {}

  @OnEvent(EVENTS.USER_REGISTERED, { async: true })
  async handle(event: any): Promise<any> {
    const scoringRecord = new RegisterScoringRecord();
    await this.scoringRecordsRepository.addRegisterScoringRecord(
      event.props.id
    );
    return scoringRecord.getRaw();
  }
}
