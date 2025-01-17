import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OPEN_API_TAG } from 'src/openapi';
import { TimeClockResponse } from '../time-clock-record.dto';
import { CommandBus } from '@nestjs/cqrs';
import { ClockOutCmd } from '../../../application/clock-out/clock-out.cmd';

@Controller('clock-out')
@ApiTags(OPEN_API_TAG.TIME_CLOCK)
export class ClockOutController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async clockIn(): Promise<TimeClockResponse> {
    const result = await this.commandBus.execute(new ClockOutCmd());
    return result.getRaw();
  }
}
