import { Injectable } from '@nestjs/common';
import { ScoringRecord } from '../../domain/scoring-record';
import { ScoringRecordsRepository } from '../../domain/scoring-records.repo';
import { SupabaseClient } from '@common/supabase-client';

@Injectable()
export class SupabaseScoringRecordsRepository
  implements ScoringRecordsRepository
{
  private readonly tableName = 'ScoringRecords';
  constructor(private readonly supabaseClient: SupabaseClient) {}

  async addScoringRecord(
    record: Partial<ScoringRecord>
  ): Promise<ScoringRecord> {
    const client = await this.supabaseClient.getClient();

    const { data } = await client
      .from(this.tableName)
      .insert({
        amount: record.amount,
        reason: record.reason,
      })
      .select('*');
    const created = data[0];

    return new ScoringRecord({
      id: created.id,
      createdAt: created.created_at,
      amount: created.amount,
      reason: created.reason,
    });
  }

  async getScoringRecords(): Promise<ScoringRecord[]> {
    const client = await this.supabaseClient.getClient();

    const { data } = await client.from(this.tableName).select('*');

    return data.map(
      (record) =>
        new ScoringRecord({
          id: record.id,
          createdAt: record.created_at,
          amount: record.amount,
          reason: record.reason,
        })
    );
  }
}
