import { GetContributionsResponse } from './get-contributions.dto';
import { QueryBus } from '@nestjs/cqrs';
import { GetContributionsQryResponse } from '@modules/contributions/application/get-contributions/get-contributions.qry.hdler';
import { GetContributionsQry } from '@modules/contributions/application/get-contributions/get-contributions.qry';
import { execute } from '@mertxe/core';
import { Controller, IController, HandleOperation } from '@mertxe/core';
import { toDto } from '@mertxe/core';
import { ApiGroup, ContributionsOperationName } from 'src/api-spec';

@Controller({
  group: ApiGroup.CONTRIBUTIONS,
  operation: ContributionsOperationName.GET_CONTRIBUTIONS,
})
export class GetContributionsController implements IController {
  constructor(private readonly queryBus: QueryBus) {}

  @HandleOperation()
  async handle(): Promise<GetContributionsResponse> {
    const result = await execute<GetContributionsQryResponse>({
      bus: this.queryBus,
      payload: new GetContributionsQry(),
    });
    return toDto(GetContributionsResponse, {
      entries: result.entries.map((contribution) => ({
        id: contribution.get('id'),
        comments: contribution.get('comments'),
        type: contribution.get('type'),
      })),
    });
  }
}
