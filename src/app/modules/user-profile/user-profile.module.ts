import { Module } from '@nestjs/common';
import { UserProfileRepository } from './domain/user-profile.repo';
import { UserProfileRepositoryImpl } from './infra/persistence/user-profile-impl.repo';
import { UserProfileController } from './infra/http/get-user-profile/get-user-profile.controller';
import { SupabaseModule } from '@common/persistence/infra/supabase';
import { CqrsModule } from '@nestjs/cqrs';
import { GetUserProfileQryHdlr } from './application/get-user-profile/get-user-profile.qry';
import { UpdateScoringOnChangesEventHdlr } from './application/update-scoring-on-changes/update-scoring-on-changes.event.hdlr';

const QUERY_HANDLERS = [GetUserProfileQryHdlr];
const EVENT_HANDLERS = [UpdateScoringOnChangesEventHdlr];

@Module({
  imports: [
    CqrsModule,
    SupabaseModule.forFeature({
      repositories: [
        {
          provide: UserProfileRepository,
          useClass: UserProfileRepositoryImpl,
        },
      ],
    }),
  ],
  providers: [...QUERY_HANDLERS, ...EVENT_HANDLERS],
  controllers: [UserProfileController],
})
export class UserProfileModule {}
