import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OPEN_API_TAG } from 'src/openapi';

class ClockInDto {
  userId: string;
}

@Controller('clock-in')
@ApiTags(OPEN_API_TAG.TIME_CLOCK)
export class ClockInController {
  @Post()
  clockIn(dto: ClockInDto) {
    console.log(dto);
  }
}
