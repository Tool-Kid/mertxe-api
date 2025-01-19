import { AdminUseCaseOperation, PrivateController } from '@common/http';
import { Contribution } from '@modules/contributions/domain/contribution';
import { Body, Param, Patch } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { OPEN_API_TAG } from 'src/api-spec/infra/openapi';
import { toDto } from '@common/utils/serialization';
import { execute } from '@common/cqrs';
import {
  ApproveContributionDto,
  ApproveContributionResponse,
} from './approve-contribution.dto';
import { ApproveContributionCmd } from '@modules/contributions/application/approve-contribution/approve-contribution.cmd';

@PrivateController('contributions/:id/approve')
@ApiTags(OPEN_API_TAG.CONTRIBUTIONS)
export class ApproveContributionController {
  constructor(private readonly commandBus: CommandBus) {}

  @Patch()
  @AdminUseCaseOperation({
    title: 'Approve a contribution',
    description: 'Approves a user contribution with its points value',
  })
  async approveContribution(
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
