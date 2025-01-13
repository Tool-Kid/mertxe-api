import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OPEN_API_TAG } from 'src/openapi';
import { TimeClockRepository } from '../../domain/time-clock.repo';

@Controller('clock-out')
@ApiTags(OPEN_API_TAG.TIME_CLOCK)
export class ClockOutController {
  constructor(private readonly timeClockRepository: TimeClockRepository) {}

  @Post()
  async clockIn() {
    const result = await this.timeClockRepository.clockOut();
    return result;
  }
}
