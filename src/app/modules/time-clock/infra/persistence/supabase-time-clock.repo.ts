import { ISupabaseRepository, SupabaseRepository } from '@common/supabase';
import { TimeClockRecord } from '../../domain/time-clock-record';
import { TimeClockRepository } from '../../domain/time-clock.repo';
import { Injectable } from '@nestjs/common';
import { InvalidOperationException } from '@common/error';

@Injectable()
@SupabaseRepository({
  table: 'ClockInRecords',
  entity: TimeClockRecord,
})
export class SupabaseTimeclockRepository
  extends ISupabaseRepository<TimeClockRecord>
  implements TimeClockRepository
{
  async clockIn(): Promise<TimeClockRecord> {
    const client = await this.client.getClient();
    const record = await client
      .from(this.tableName)
      .select('*')
      .filter('clock_out_at', 'is', null);

    const isFirstClockIn = record.count === null;
    const hasClockInSessionStarted = record.data.at(0);

    if (!isFirstClockIn || hasClockInSessionStarted) {
      throw new InvalidOperationException('Session already active');
    }

    const emptyTimeRecord = new TimeClockRecord({});

    const entity = await this.create(emptyTimeRecord);

    return entity as TimeClockRecord;
  }

  async clockOut(): Promise<TimeClockRecord> {
    const client = await this.client.getClient();
    const userId = (await client.auth.getUser()).data.user.id;

    const currentClockRecord = await client
      .from(this.tableName)
      .select('*')
      .filter('clock_out_at', 'is', null);

    const noSessionStarted = currentClockRecord.data.length === 0;

    if (noSessionStarted) {
      throw new InvalidOperationException('No session active');
    }

    const entity = new TimeClockRecord({
      id: currentClockRecord.data[0].id,
      clockOutAt: new Date().toISOString(),
      userId,
    });
    const updated = await this.update(entity);
    return updated as TimeClockRecord;
  }

  async getTimeClockRecords(): Promise<TimeClockRecord[]> {
    const clockRecords = await this.findAll();
    return clockRecords;
  }
}
