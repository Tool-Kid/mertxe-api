import { TimeClockRecord } from '@modules/time-clock/domain/time-clock-record';
import { TimeClockRepository } from '@modules/time-clock/domain/time-clock.repo';
import { InvalidOperationException } from '@mertxe/core';
import { PersistenceRepository, Repository } from '@mertxe/core';

@Repository({
  table: 'TimeClockRecords',
  entity: TimeClockRecord,
})
export class TimeclockRepositoryImpl
  extends PersistenceRepository<TimeClockRecord>
  implements TimeClockRepository
{
  async clockIn(): Promise<TimeClockRecord> {
    const recordWithNoClockOut = await this.findOne({
      filters: [['clock_out_at', 'is', null]],
    });
    const allRecords = await this.findAll();

    const isFirstClockIn = allRecords.length === 0;
    const hasTimeClockSessionStarted = recordWithNoClockOut !== null;

    if (!isFirstClockIn && hasTimeClockSessionStarted) {
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
