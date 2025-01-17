import { Module } from '@nestjs/common';
import { ScoringRecordsRepository } from './domain/scoring-records.repo';
import { UserRegisteredEventHandler } from './application/user-registered-event.hdlr';
import { CqrsModule } from '@nestjs/cqrs';
import { SupabaseScoringRecordsRepository } from './infra/persistence/supabase-scoring-records.repo';
import { GetScoringRecordsQryHdlr } from './application/get-scoring-records/get-scoring-records.qry.hdlr';
import { GetScoringRecordsController } from './infra/http/get-scoring-records/get-scoring-records.controller';
import { TimeClockSessionFinishedEventHandler } from './application/time-clock-session-finished/time-clock-session-finised-event.hdlr';
import { SupabaseModule } from '@common/supabase';

const EVENT_HANDLERS = [
  UserRegisteredEventHandler,
  TimeClockSessionFinishedEventHandler,
];
const QUERY_HANDLERS = [GetScoringRecordsQryHdlr];

@Module({
  imports: [
    CqrsModule,
    SupabaseModule.forFeature({
      repositories: [
        {
          provide: ScoringRecordsRepository,
          useClass: SupabaseScoringRecordsRepository,
        },
      ],
    }),
  ],
  controllers: [GetScoringRecordsController],
  providers: [...EVENT_HANDLERS, ...QUERY_HANDLERS],
})
export class ScoringModule {}
