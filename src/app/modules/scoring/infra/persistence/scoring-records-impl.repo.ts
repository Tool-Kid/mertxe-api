import { ScoringRecord } from '../../domain/scoring-record';
import { ScoringRecordsRepository } from '../../domain/scoring-records.repo';
import { ScoringRecordFactory } from '../../domain/types/factory';
import { ScoringRecordReason } from '../../domain/scoring-record-reason';
import { PersistenceRepository, Repository } from '@mertxe/core';

@Repository({
  table: 'ScoringRecords',
  entity: ScoringRecord,
})
export class ScoringRecordsRepositoryImpl
  extends PersistenceRepository<ScoringRecord>
  implements ScoringRecordsRepository
{
  async addScoringRecord(
    record: Partial<ScoringRecord>
  ): Promise<ScoringRecord> {
    const added = await this.create(record);
    return added as ScoringRecord;
  }

  async addRegisterScoringRecord(): Promise<ScoringRecord> {
    const record = await ScoringRecordFactory.build(
      ScoringRecordReason.REGISTER,
      {}
    );
    const added = await this.create(record);
    return added as ScoringRecord;
  }

  async getScoringRecords(): Promise<ScoringRecord[]> {
    const records = await this.findAll();
    return records;
  }
}
