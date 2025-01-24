import { Module } from '@nestjs/common';
import { UserProfileRepository } from './domain/user-profile.repo';
import { UserProfileRepositoryImpl } from './infra/persistence/user-profile-impl.repo';
import { UserProfileController } from './infra/http/get-user-profile/get-user-profile.controller';
import { PersistenceModule } from '@mertxe/core';
import { CqrsModule } from '@nestjs/cqrs';
import { GetUserProfileQryHdlr } from './application/get-user-profile/get-user-profile.qry';
import { OnRecordAddedUpdateScoringEventHdlr } from './application/on-record-added-update-scoring/on-record-added-update-scoring.event.hdlr';

const QUERY_HANDLERS = [GetUserProfileQryHdlr];
const EVENT_HANDLERS = [OnRecordAddedUpdateScoringEventHdlr];

@Module({
  imports: [
    CqrsModule,
    PersistenceModule.forFeature({
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
