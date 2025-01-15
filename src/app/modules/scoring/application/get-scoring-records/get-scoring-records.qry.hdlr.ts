import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ScoringRecord } from '../../domain/scoring-record';
import { GetScoringRecordsQry } from './get-scoring-redords.qry';
import { ScoringRecordsRepository } from '../../domain/scoring-records.repo';

@QueryHandler(GetScoringRecordsQry)
export class GetScoringRecordsQryHdlr
  implements IQueryHandler<GetScoringRecordsQry, ScoringRecord[]>
{
  constructor(
    private readonly scoringRecordsRepository: ScoringRecordsRepository
  ) {}

  execute(query: GetScoringRecordsQry): Promise<ScoringRecord[]> {
    const result = this.scoringRecordsRepository.getScoringRecords();
    return result;
  }
}
