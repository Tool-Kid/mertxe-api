import { Module } from '@nestjs/common';
import { ContributionsRepository } from './domain/contributions.repo';
import { ContributionsRepositoryImpl } from './infra/persistence/contributions-impl.repo';
import { GetContributionsQryHdler } from './application/get-contributions/get-contributions.qry.hdler';
import { SupabaseModule } from '@mertxe/core';
import { GetContributionsController } from './infra/http/get-contributions/get-contributions.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { AddContributionCmdHdlr } from './application/add-contribution/add-contributions.cmd.hdlr';
import { AddContributionController } from './infra/http/add-contribution/add-contribution.controller';
import { ApproveContributionController } from './infra/http/approve-contribution/approve-contribution.controller';
import { ApproveContributionCmdHdlr } from './application/approve-contribution/approve-contribution.cmd.hdlr';

const QUERY_HANDLERS = [GetContributionsQryHdler];
const COMMAND_HANDLERS = [AddContributionCmdHdlr, ApproveContributionCmdHdlr];

@Module({
  imports: [
    CqrsModule,
    SupabaseModule.forFeature({
      repositories: [
        {
          provide: ContributionsRepository,
          useClass: ContributionsRepositoryImpl,
        },
      ],
    }),
  ],
  controllers: [
    GetContributionsController,
    AddContributionController,
    ApproveContributionController,
  ],
  providers: [...QUERY_HANDLERS, ...COMMAND_HANDLERS],
})
export class ContributionsModule {}
