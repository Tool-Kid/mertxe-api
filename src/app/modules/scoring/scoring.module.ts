import { Module } from '@nestjs/common';
import { ScoringRecordsRepository } from './domain/scoring-records.repo';
import { UserRegisteredEventHandler } from './application/user-registered-event.hdlr';
import { CqrsModule } from '@nestjs/cqrs';
import { SupabaseScoringRecordsRepository } from './infra/persistence/supabase-scoring-records.repo';
import { GetScoringRecordsQryHdlr } from './application/get-scoring-records/get-scoring-records.qry.hdlr';
import { GetScoringRecordsController } from './infra/http/get-scoring-records/get-scoring-records.controller';
import { ClsModule } from 'nestjs-cls';
import { TimeClockSessionFinishedEventHandler } from './application/time-clock-session-finished/time-clock-session-finised-event.hdlr';

const EVENT_HANDLERS = [
  UserRegisteredEventHandler,
  TimeClockSessionFinishedEventHandler,
];
const QUERY_HANDLERS = [GetScoringRecordsQryHdlr];

@Module({
  imports: [CqrsModule, ClsModule],
  controllers: [GetScoringRecordsController],
  providers: [
    ...EVENT_HANDLERS,
    ...QUERY_HANDLERS,
    {
      provide: ScoringRecordsRepository,
      useClass: SupabaseScoringRecordsRepository,
    },
  ],
})
export class ScoringModule {}
