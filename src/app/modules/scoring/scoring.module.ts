import { Module } from '@nestjs/common';
import { ScoringRecordsRepository } from './domain/scoring-records.repo';
import { SupabaseScoringRecordsRepository } from './infra/persistence/supabase-scoring-records.repo';
import { UserRegisteredEventHandler } from './application/user-registered-event.hdlr';

const EVENT_HANDLERS = [UserRegisteredEventHandler];

@Module({
  providers: [
    {
      provide: ScoringRecordsRepository,
      useClass: SupabaseScoringRecordsRepository,
    },
    ...EVENT_HANDLERS,
  ],
})
export class ScoringModule {}
