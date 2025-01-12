import { Module } from '@nestjs/common';
import { ClockInController } from './clock-in.controller';

@Module({
  controllers: [ClockInController],
})
export class TimeClockModule {}
