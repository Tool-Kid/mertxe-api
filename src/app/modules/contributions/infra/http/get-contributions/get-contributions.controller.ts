import { Get } from '@nestjs/common';
import { GetContributionsResponse } from './get-contributions.dto';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { OPEN_API_TAG } from 'src/openapi';
import { GetContributionsQryResponse } from '../../../application/get-contributions/get-contributions.qry.hdler';
import { mapArrayToRaw } from '@common/ddd';
import { GetContributionsQry } from '../../../application/get-contributions/get-contributions.qry';
import { execute } from '@common/cqrs';
import { PrivateController } from '@common/http';
import { toDto } from '@common/utils/serialization';

@PrivateController('contributions')
@ApiTags(OPEN_API_TAG.CONTRIBUTIONS)
export class GetContributionsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async getContributions(): Promise<GetContributionsResponse> {
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
