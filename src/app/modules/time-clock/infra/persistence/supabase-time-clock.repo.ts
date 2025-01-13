import { SupabaseClient } from '@common/supabase-client';
import { ClockInRecord } from '../../domain/clock-in-record';
import { TimeClockRepository } from '../../domain/time-clock.repo';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SupabaseTimeclockRepository implements TimeClockRepository {
  readonly tableName = 'ClockInRecords';
  constructor(private readonly supabaseClient: SupabaseClient) {}

  async clockIn(): Promise<ClockInRecord> {
    const client = await this.supabaseClient.getClient();
    const userId = (await client.auth.getUser()).data.user.id;

    const { data } = await client
      .from(this.tableName)
      .insert({ user_id: userId })
      .select('*');
    const clockInRecord = data[0];

    return new ClockInRecord({
      id: clockInRecord.id,
      clockInAt: clockInRecord.clock_in_at,
      clockOutAt: clockInRecord.clock_out_at,
    });
  }

  async clockOut(): Promise<ClockInRecord> {
    const client = await this.supabaseClient.getClient();
    const userId = (await client.auth.getUser()).data.user.id;

    const currentClockRecord = await client
      .from(this.tableName)
      .select('*')
      .filter('clock_out_at', 'is', null);

    const { data } = await client
      .from(this.tableName)
      .update({ clock_out_at: new Date(), user_id: userId })
      .eq('id', currentClockRecord.data[0].id)
      .select('*');
    const clockInRecord = data[0];

    return new ClockInRecord({
      id: clockInRecord.id,
      clockInAt: clockInRecord.clock_in_at,
      clockOutAt: clockInRecord.clock_out_at,
    });
  }

  async getClockInRecords(): Promise<ClockInRecord[]> {
    const client = await this.supabaseClient.getClient();
    const clockRecords = await client.from(this.tableName).select('*');

    return clockRecords.data.map(
      (record) =>
        new ClockInRecord({
          id: record.id,
          clockInAt: record.clock_in_at,
          clockOutAt: record.clock_out_at,
        })
    );
  }
}
