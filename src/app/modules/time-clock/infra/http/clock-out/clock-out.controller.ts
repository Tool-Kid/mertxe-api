import { TimeClockResponse } from '../time-clock-record.dto';
import { CommandBus } from '@nestjs/cqrs';
import { ClockOutCmd } from '@modules/time-clock/application/clock-out/clock-out.cmd';
import { toDto } from '@mertxe/core';
import { execute } from '@mertxe/core';
import { TimeClockRecord } from '@modules/time-clock/domain/time-clock-record';
import { Controller, IController, HandleOperation } from '@mertxe/core';
import { ApiGroup, TimeClockOperationName } from 'src/api-spec';

@Controller({
  group: ApiGroup.TIME_CLOCK,
  operation: TimeClockOperationName.CLOCK_OUT,
})
export class ClockOutController implements IController {
  constructor(private readonly commandBus: CommandBus) {}

  @HandleOperation()
  async handle(): Promise<TimeClockResponse> {
    const result = await execute<TimeClockRecord>({
      bus: this.commandBus,
      payload: new ClockOutCmd(),
    });
    return toDto(TimeClockResponse, {
      clockInAt: result.get('clockInAt'),
      clockOutAt: result.get('clockOutAt'),
    });
  }
}
