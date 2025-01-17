import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OPEN_API_TAG } from 'src/openapi';
import { TimeClockResponse } from '../time-clock-record.dto';
import { CommandBus } from '@nestjs/cqrs';
import { ClockOutCmd } from '../../../application/clock-out/clock-out.cmd';
import { toDto } from '@common/utils/serialization';
import { execute } from '@common/cqrs';
import { TimeClockRecord } from '../../../domain/time-clock-record';

@Controller('clock-out')
@ApiTags(OPEN_API_TAG.TIME_CLOCK)
export class ClockOutController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async clockIn(): Promise<TimeClockResponse> {
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
