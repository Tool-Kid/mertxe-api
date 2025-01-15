import { ScoringRecord } from './scoring-record';

export abstract class ScoringRecordsRepository {
  abstract addScoringRecord(
    record: Partial<ScoringRecord>
  ): Promise<ScoringRecord>;
  abstract addRegisterScoringRecord(userId: string): Promise<ScoringRecord>;
  abstract getScoringRecords(): Promise<ScoringRecord[]>;
}
