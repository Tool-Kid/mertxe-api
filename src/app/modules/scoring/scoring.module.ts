import { Module } from '@nestjs/common';
import { ScoringRecordsRepository } from './domain/scoring-records.repo';
import { SupabaseScoringRecordsRepository } from './infra/persistence/supabase-scoring-records.repo';

@Module({
  providers: [
    {
      provide: ScoringRecordsRepository,
      useClass: SupabaseScoringRecordsRepository,
    },
  ],
})
export class ScoringModule {}
