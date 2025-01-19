import { GetScoringRecordsResponse } from './get-scoring-records.dto';
import { QueryBus } from '@nestjs/cqrs';
import { GetScoringRecordsQry } from '../../../application/get-scoring-records/get-scoring-redords.qry';
import { execute } from '@common/cqrs';
import { ScoringRecord } from '@modules/scoring/domain/scoring-record';
import { toDto } from '@common/utils/serialization';
import { Controller, IController, HandleOperation } from '@common/http';
import { ApiGroup, ScoringOperationName } from 'src/api-spec';

@Controller({
  group: ApiGroup.SCORING,
  operation: ScoringOperationName.GET_SCORING_RECORDS,
})
export class GetScoringRecordsController implements IController {
  constructor(private readonly qryBus: QueryBus) {}

  @HandleOperation()
  async handle(): Promise<GetScoringRecordsResponse> {
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
