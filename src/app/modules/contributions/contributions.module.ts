import { Module } from '@nestjs/common';
import { ContributionsRepository } from './domain/contributions.repo';
import { SupabaseContributionsRepository } from './infra/persistence/supabase-contributions.repo';
import { GetContributionsQryHdler } from './application/get-contributions/get-contributions.qry.hdler';
import { SupabaseModule } from '@common/supabase';
import { GetContributionsController } from './infra/http/get-contributions.controller';

const QUERY_HANDLERS = [GetContributionsQryHdler];

@Module({
  imports: [
    SupabaseModule.forFeature({
      repositories: [
        {
          provide: ContributionsRepository,
          useClass: SupabaseContributionsRepository,
        },
      ],
    }),
  ],
  controllers: [GetContributionsController],
  providers: [...QUERY_HANDLERS],
})
export class ContributionsModule {}
