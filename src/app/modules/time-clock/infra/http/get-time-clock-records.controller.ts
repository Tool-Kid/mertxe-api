import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OPEN_API_TAG } from 'src/openapi';
import { TimeClockRepository } from '../../domain/time-clock.repo';
import { TimeClockResponse } from './time-clock-record.dto';

@Controller('time-clock-records')
@ApiTags(OPEN_API_TAG.TIME_CLOCK)
export class GetTimeClockRecordsController {
  constructor(private readonly timeClockRepository: TimeClockRepository) {}

  @Get()
  async findTimeClockRecords(): Promise<TimeClockResponse[]> {
    const result = await this.timeClockRepository.getTimeClockRecords();
    return result;
  }
}
