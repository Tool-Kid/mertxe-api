import { ScoringRecord } from './scoring-record';

export abstract class ScoringRecordsRepository {
  abstract addScoringRecord(
    record: Partial<ScoringRecord>
  ): Promise<ScoringRecord>;
  abstract getScoringRecords(): Promise<ScoringRecord[]>;
}
