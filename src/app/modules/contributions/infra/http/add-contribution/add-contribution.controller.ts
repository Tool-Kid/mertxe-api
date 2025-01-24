import { AddContributionCmd } from '@modules/contributions/application/add-contribution/add-contribution.cmd';
import { Contribution } from '@modules/contributions/domain/contribution';
import { Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  AddContributionDto,
  AddContributionResponse,
} from './add-contribution.dto';
import { toDto } from '@mertxe/core';
import { execute } from '@mertxe/core';
import { Controller, HandleOperation } from '@mertxe/core';
import { ApiGroup, ContributionsOperationName } from 'src/api-spec';

@Controller({
  group: ApiGroup.CONTRIBUTIONS,
  operation: ContributionsOperationName.ADD_CONTRIBUTION,
})
export class AddContributionController {
  constructor(private readonly commandBus: CommandBus) {}

  @HandleOperation()
  async handle(
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
