import { SupabaseClient } from '@common/supabase-client';
import { TimeClockRecord } from '../../domain/time-clock-record';
import { TimeClockRepository } from '../../domain/time-clock.repo';
import { Injectable } from '@nestjs/common';
import { InvalidOperationException } from '@common/error';

@Injectable()
export class SupabaseTimeclockRepository implements TimeClockRepository {
  readonly tableName = 'ClockInRecords';
  constructor(private readonly supabaseClient: SupabaseClient) {}

  async clockIn(): Promise<TimeClockRecord> {
    const client = await this.supabaseClient.getClient();
    const userId = (await client.auth.getUser()).data.user.id;

    const record = await client
      .from(this.tableName)
      .select('*')
      .filter('clock_out_at', 'is', null);

    const isFirstClockIn = record.count === null;
    const hasClockInSessionStarted = record.data.at(0);

    if (!isFirstClockIn || hasClockInSessionStarted) {
      throw new InvalidOperationException('Session already active');
    }

    const { data } = await client
      .from(this.tableName)
      .insert({ user_id: userId })
      .select('*');
    const clockInRecord = data[0];

    return new TimeClockRecord({
      id: clockInRecord.id,
      clockInAt: clockInRecord.clock_in_at,
      clockOutAt: clockInRecord.clock_out_at,
    });
  }

  async clockOut(): Promise<TimeClockRecord> {
    const client = await this.supabaseClient.getClient();
    const userId = (await client.auth.getUser()).data.user.id;

    const currentClockRecord = await client
      .from(this.tableName)
      .select('*')
      .filter('clock_out_at', 'is', null);

    const noSessionStarted = currentClockRecord.count === null;

    if (noSessionStarted) {
      throw new InvalidOperationException('No session active');
    }

    const { data } = await client
      .from(this.tableName)
      .update({ clock_out_at: new Date(), user_id: userId })
      .eq('id', currentClockRecord.data[0].id)
      .select('*');
    const clockInRecord = data[0];

    return new TimeClockRecord({
      id: clockInRecord.id,
      clockInAt: clockInRecord.clock_in_at,
      clockOutAt: clockInRecord.clock_out_at,
    });
  }

  async getTimeClockRecords(): Promise<TimeClockRecord[]> {
    const client = await this.supabaseClient.getClient();
    const clockRecords = await client.from(this.tableName).select('*');

    return clockRecords.data.map(
      (record) =>
        new TimeClockRecord({
          id: record.id,
          clockInAt: record.clock_in_at,
          clockOutAt: record.clock_out_at,
        })
    );
  }
}
