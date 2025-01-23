import { Module } from '@nestjs/common';
import { ScoringRecordsRepository } from './domain/scoring-records.repo';
import { OnUserRegisteredEventHandler } from './application/on-user-registered-event.hdlr';
import { CqrsModule } from '@nestjs/cqrs';
import { ScoringRecordsRepositoryImpl } from './infra/persistence/scoring-records-impl.repo';
import { GetScoringRecordsQryHdlr } from './application/get-scoring-records/get-scoring-records.qry.hdlr';
import { GetScoringRecordsController } from './infra/http/get-scoring-records/get-scoring-records.controller';
import { OnTimeClockSessionFinishedEventHandler } from './application/on-time-clock-session-finished/on-time-clock-session-finised-event.hdlr';
import { SupabaseModule } from '@common/persistence/infra/supabase';

const EVENT_HANDLERS = [
  OnUserRegisteredEventHandler,
  OnTimeClockSessionFinishedEventHandler,
];
const QUERY_HANDLERS = [GetScoringRecordsQryHdlr];

@Module({
  imports: [
    CqrsModule,
    SupabaseModule.forFeature({
      repositories: [
        {
          provide: ScoringRecordsRepository,
          useClass: ScoringRecordsRepositoryImpl,
        },
      ],
    }),
  ],
  controllers: [GetScoringRecordsController],
  providers: [...EVENT_HANDLERS, ...QUERY_HANDLERS],
})
export class ScoringModule {}
