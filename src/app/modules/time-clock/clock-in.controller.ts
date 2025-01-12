import { Controller, Post } from '@nestjs/common';

class ClockInDto {
  userId: string;
}

@Controller('clock-in')
export class ClockInController {
  @Post()
  clockIn(dto: ClockInDto) {
    console.log(dto);
  }
}
