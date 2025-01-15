import { Module } from '@nestjs/common';
import { ScoringRecordsRepository } from './domain/scoring-records.repo';
import { UserRegisteredEventHandler } from './application/user-registered-event.hdlr';
import { CqrsModule } from '@nestjs/cqrs';
import { SupabaseScoringRecordsRepository } from './infra/persistence/supabase-scoring-records.repo';

const EVENT_HANDLERS = [UserRegisteredEventHandler];

@Module({
  imports: [CqrsModule],
  providers: [
    {
      provide: ScoringRecordsRepository,
      useClass: SupabaseScoringRecordsRepository,
    },
    ...EVENT_HANDLERS,
  ],
})
export class ScoringModule {}
