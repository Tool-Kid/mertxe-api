import { Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OPEN_API_TAG } from 'src/openapi';
import { TimeClockResponse } from '../time-clock-record.dto';
import { CommandBus } from '@nestjs/cqrs';
import { execute } from '@common/cqrs';
import { ClockInCmd } from '../../../application/clock-in/clock-in-cmd';
import { toDto } from '@common/utils/serialization';
import { TimeClockRecord } from '../../../domain/time-clock-record';
import { PrivateController } from '@common/http';

@PrivateController('clock-in')
@ApiTags(OPEN_API_TAG.TIME_CLOCK)
export class ClockInController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async clockIn(): Promise<TimeClockResponse> {
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
