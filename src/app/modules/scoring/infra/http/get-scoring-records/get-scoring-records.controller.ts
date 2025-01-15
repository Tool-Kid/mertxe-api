import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OPEN_API_TAG } from 'src/openapi';
import { GetScoringRecordsResponse } from './get-scoring-records.dto';
import { QueryBus } from '@nestjs/cqrs';
import { GetScoringRecordsQry } from '../../../application/get-scoring-records/get-scoring-redords.qry';
import { ClsService } from 'nestjs-cls';

@Controller('scoring-records')
@ApiTags(OPEN_API_TAG.SCORING)
export class GetScoringRecordsController {
  constructor(
    private readonly qryBus: QueryBus,
    private readonly cls: ClsService
  ) {}

  @Get()
  async clockIn(): Promise<GetScoringRecordsResponse> {
    const result = await this.qryBus.execute(new GetScoringRecordsQry());
    return {
      entries: result.map((entry) => ({
        createdAt: entry.get('createdAt'),
        amount: entry.get('amount'),
        reason: entry.get('reason'),
      })),
    };
  }
}
