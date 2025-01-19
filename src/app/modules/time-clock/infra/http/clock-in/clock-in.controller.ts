import { TimeClockResponse } from '../time-clock-record.dto';
import { CommandBus } from '@nestjs/cqrs';
import { execute } from '@common/cqrs';
import { ClockInCmd } from '../../../application/clock-in/clock-in-cmd';
import { toDto } from '@common/utils/serialization';
import { TimeClockRecord } from '../../../domain/time-clock-record';
import { Controller, IController, HandleOperation } from '@common/http';
import { ApiGroup, TimeClockOperationName } from 'src/api-spec';

@Controller({
  group: ApiGroup.TIME_CLOCK,
  operation: TimeClockOperationName.CLOCK_IN,
})
export class ClockInController implements IController {
  constructor(private readonly commandBus: CommandBus) {}

  @HandleOperation()
  async handle(): Promise<TimeClockResponse> {
    const timeClockRecord = await execute<TimeClockRecord>({
      bus: this.commandBus,
      payload: new ClockInCmd(),
    });
    return toDto(TimeClockResponse, {
      clockInAt: timeClockRecord.get('clockInAt'),
      clockOutAt: timeClockRecord.get('clockOutAt'),
    });
  }
}
