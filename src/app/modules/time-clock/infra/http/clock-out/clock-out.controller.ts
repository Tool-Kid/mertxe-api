import { TimeClockResponse } from '../time-clock-record.dto';
import { CommandBus } from '@nestjs/cqrs';
import { ClockOutCmd } from '../../../application/clock-out/clock-out.cmd';
import { toDto } from '@common/utils/serialization';
import { execute } from '@common/cqrs';
import { TimeClockRecord } from '../../../domain/time-clock-record';
import { Controller, IController, HandleOperation } from '@common/http';
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
