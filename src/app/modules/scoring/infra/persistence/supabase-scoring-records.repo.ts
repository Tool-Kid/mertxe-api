import { Injectable } from '@nestjs/common';
import { ScoringRecord } from '../../domain/scoring-record';
import { ScoringRecordsRepository } from '../../domain/scoring-records.repo';
import { SupabaseClient } from '@common/supabase-client';
import { ScoringRecordFactory } from '../../domain/types/factory';
import { ScoringRecordReason } from '../../domain/scoring-record-reason';

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
    const user = await client.auth.getUser();

    const { data, error } = await client
      .from(this.tableName)
      .insert({
        amount: record.getRaw().amount,
        reason: record.getRaw().reason,
        user_id: user.data.user.id,
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

  async addRegisterScoringRecord(userId: string): Promise<ScoringRecord> {
    const client = await this.supabaseClient.getClient();
    const record = await ScoringRecordFactory.build(
      ScoringRecordReason.REGISTER,
      {}
    );

    const { data, error } = await client
      .from(this.tableName)
      .insert({
        amount: record.getRaw().amount,
        reason: record.getRaw().reason,
        user_id: userId,
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
    const userId = (await client.auth.getUser()).data.user.id;

    const { data } = await client
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId);

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
