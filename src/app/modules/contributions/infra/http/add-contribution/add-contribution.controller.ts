import { PrivateController } from '@common/http';
import { AddContributionCmd } from '@modules/contributions/application/add-contribution/add-contribution.cmd';
import { Contribution } from '@modules/contributions/domain/contribution';
import { Body, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { OPEN_API_TAG } from 'src/openapi';
import {
  AddContributionDto,
  AddContributionResponse,
} from './add-contribution.dto';
import { toDto } from '@common/utils/serialization';
import { execute } from '@common/cqrs';

@PrivateController('contributions')
@ApiTags(OPEN_API_TAG.CONTRIBUTIONS)
export class AddContributionController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async addContribution(
    @Body() dto: AddContributionDto
  ): Promise<AddContributionResponse> {
    const contribution = await execute<Contribution>({
      bus: this.commandBus,
      payload: new AddContributionCmd(dto.type, dto.comments),
    });
    return toDto(AddContributionResponse, {
      id: contribution.get('id'),
      type: contribution.get('type'),
      comments: contribution.get('comments'),
      points: contribution.get('points'),
    });
  }
}
