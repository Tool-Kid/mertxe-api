import { Module } from '@nestjs/common';
import { ClockInController } from './infra/http/clock-in/clock-in.controller';
import { TimeClockRepository } from './domain/time-clock.repo';
import { SupabaseTimeclockRepository } from './infra/persistence/supabase-time-clock.repo';
import { ClockOutController } from './infra/http/clock-out/clock-out.controller';
import { GetTimeClockRecordsController } from './infra/http/get-time-clock/get-time-clock-records.controller';
import { ClockOutCmdHdlr } from './application/clock-out/clock-out.cmd';

const COMMAND_HANDLERS = [ClockOutCmdHdlr];

@Module({
  controllers: [
    ClockInController,
    ClockOutController,
    GetTimeClockRecordsController,
  ],
  providers: [
    { provide: TimeClockRepository, useClass: SupabaseTimeclockRepository },
    ...COMMAND_HANDLERS,
  ],
})
export class TimeClockModule {}
