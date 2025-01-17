import { Module } from '@nestjs/common';
import { ClockInController } from './infra/http/clock-in/clock-in.controller';
import { TimeClockRepository } from './domain/time-clock.repo';
import { SupabaseTimeclockRepository } from './infra/persistence/supabase-time-clock.repo';
import { ClockOutController } from './infra/http/clock-out/clock-out.controller';
import { GetTimeClockRecordsController } from './infra/http/get-time-clock/get-time-clock-records.controller';
import { ClockOutCmdHdlr } from './application/clock-out/clock-out.cmd';
import { SupabaseModule } from '@common/supabase';

const COMMAND_HANDLERS = [ClockOutCmdHdlr];

@Module({
  imports: [
    SupabaseModule.forFeature({
      repositories: [
        { provide: TimeClockRepository, useClass: SupabaseTimeclockRepository },
      ],
    }),
  ],
  controllers: [
    ClockInController,
    ClockOutController,
    GetTimeClockRecordsController,
  ],
  providers: [...COMMAND_HANDLERS],
})
export class TimeClockModule {}
