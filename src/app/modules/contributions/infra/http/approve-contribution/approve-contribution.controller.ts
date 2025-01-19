import { Controller, IController, HandleOperation } from '@common/http';
import { Contribution } from '@modules/contributions/domain/contribution';
import { Body, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { toDto } from '@common/utils/serialization';
import { execute } from '@common/cqrs';
import {
  ApproveContributionDto,
  ApproveContributionResponse,
} from './approve-contribution.dto';
import { ApproveContributionCmd } from '@modules/contributions/application/approve-contribution/approve-contribution.cmd';
import { ApiGroup, ContributionsOperationName } from 'src/api-spec';

@Controller({
  group: ApiGroup.CONTRIBUTIONS,
  operation: ContributionsOperationName.APPROVE_CONTRIBUTION,
})
export class ApproveContributionController implements IController {
  constructor(private readonly commandBus: CommandBus) {}

  @HandleOperation()
  async handle(
    @Param('id') id: number,
    @Body() dto: ApproveContributionDto
  ): Promise<ApproveContributionResponse> {
    const contribution = await execute<Contribution>({
      bus: this.commandBus,
      payload: new ApproveContributionCmd(id, { points: dto.points }),
    });
    return toDto(ApproveContributionResponse, {
      id: contribution.get('id'),
      status: contribution.get('status'),
      type: contribution.get('type'),
      comments: contribution.get('comments'),
      points: contribution.get('points'),
    });
  }
}
