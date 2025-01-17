import { Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OPEN_API_TAG } from 'src/openapi';
import { GetScoringRecordsResponse } from './get-scoring-records.dto';
import { QueryBus } from '@nestjs/cqrs';
import { GetScoringRecordsQry } from '../../../application/get-scoring-records/get-scoring-redords.qry';
import { execute } from '@common/cqrs';
import { ScoringRecord } from '@modules/scoring/domain/scoring-record';
import { toDto } from '@common/utils/serialization';
import { PrivateController } from '@common/http';

@PrivateController('scoring-records')
@ApiTags(OPEN_API_TAG.SCORING)
export class GetScoringRecordsController {
  constructor(private readonly qryBus: QueryBus) {}

  @Get()
  async clockIn(): Promise<GetScoringRecordsResponse> {
    const result = await execute<ScoringRecord[]>({
      bus: this.qryBus,
      payload: new GetScoringRecordsQry(),
    });
    return toDto(GetScoringRecordsResponse, {
      entries: result.map((record) => ({
        amount: record.get('amount'),
        reason: record.get('reason'),
        createdAt: record.get('createdAt'),
      })),
    });
  }
}
