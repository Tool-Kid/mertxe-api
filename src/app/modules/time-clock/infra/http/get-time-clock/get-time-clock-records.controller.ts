import { TimeClockRepository } from '@modules/time-clock/domain/time-clock.repo';
import { TimeClockResponse } from '../time-clock-record.dto';
import { Controller, IController, HandleOperation } from '@mertxe/core';
import { toDto } from '@mertxe/core';
import { ApiGroup, TimeClockOperationName } from 'src/api-spec';

@Controller({
  group: ApiGroup.TIME_CLOCK,
  operation: TimeClockOperationName.GET_TIME_CLOCK_RECORDS,
})
export class GetTimeClockRecordsController implements IController {
  constructor(private readonly timeClockRepository: TimeClockRepository) {}

  @HandleOperation()
  async handle(): Promise<TimeClockResponse[]> {
    const timeClockRecords =
      await this.timeClockRepository.getTimeClockRecords();
    return timeClockRecords.map((record) =>
      toDto(TimeClockResponse, {
        clockInAt: record.get('clockInAt'),
        clockOutAt: record.get('clockOutAt'),
      })
    );
  }
}
