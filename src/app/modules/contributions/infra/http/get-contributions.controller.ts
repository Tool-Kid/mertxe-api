import { Controller, Get } from '@nestjs/common';
import { GetContributionsDto } from './get-contributions.dto';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { OPEN_API_TAG } from 'src/openapi';
import { GetContributionsQryResponse } from '../../application/get-contributions/get-contributions.qry.hdler';
import { typedAsync } from '@common/utils';
import { mapToRaw } from '@common/ddd';
import { GetContributionsQry } from '../../application/get-contributions/get-contributions.qry';
import { execute } from '@common/cqrs';

@Controller('contributions')
@ApiTags(OPEN_API_TAG.CONTRIBUTIONS)
export class GetContributionsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async getContributions(): Promise<GetContributionsDto> {
    const result = await execute<GetContributionsQryResponse>({
      bus: this.queryBus,
      payload: new GetContributionsQry(),
    });
    return {
      entries: mapToRaw(result.entries),
    };
  }
}
