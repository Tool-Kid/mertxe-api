import { ISupabaseRepository, SupabaseRepository } from '@common/supabase';
import { TimeClockRecord } from '../../domain/time-clock-record';
import { TimeClockRepository } from '../../domain/time-clock.repo';
import { InvalidOperationException } from '@common/error';

@SupabaseRepository({
  table: 'TimeClockRecords',
  entity: TimeClockRecord,
})
export class SupabaseTimeclockRepository
  extends ISupabaseRepository<TimeClockRecord>
  implements TimeClockRepository
{
  async clockIn(): Promise<TimeClockRecord> {
    const recordWithNoClockOut = await this.findOne({
      filters: [['clock_out_at', 'is', null]],
    });
    const allRecords = await this.findAll();

    const isFirstClockIn = allRecords.length === 0;
    const hasTimeClockSessionStarted = recordWithNoClockOut !== null;

    if (isFirstClockIn || hasTimeClockSessionStarted) {
      throw new InvalidOperationException('Session already active');
    }

    const emptyTimeRecord = new TimeClockRecord({});
    const entity = await this.create(emptyTimeRecord);
    return entity as TimeClockRecord;
  }

  async clockOut(): Promise<TimeClockRecord> {
    const currentClockRecord = await this.findOne({
      filters: [['clock_out_at', 'is', null]],
    });
    const noSessionStarted = currentClockRecord === null;

    if (noSessionStarted) {
      throw new InvalidOperationException('No session active');
    }

    currentClockRecord.set('clockOutAt').to(new Date().toISOString());

    const updated = await this.update(currentClockRecord);

    return updated as TimeClockRecord;
  }

  async getTimeClockRecords(): Promise<TimeClockRecord[]> {
    const clockRecords = await this.findAll();
    return clockRecords;
  }
}
