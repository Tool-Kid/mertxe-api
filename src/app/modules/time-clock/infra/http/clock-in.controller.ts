import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OPEN_API_TAG } from 'src/openapi';
import { TimeClockRepository } from '../../domain/time-clock.repo';
import { TimeClockResponse } from './time-clock-record.dto';

@Controller('clock-in')
@ApiTags(OPEN_API_TAG.TIME_CLOCK)
export class ClockInController {
  constructor(private readonly timeClockRepository: TimeClockRepository) {}

  @Post()
  async clockIn(): Promise<TimeClockResponse> {
    const result = await this.timeClockRepository.clockIn();
    return result;
  }
}
