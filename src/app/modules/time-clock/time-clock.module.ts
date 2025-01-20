import { Module } from '@nestjs/common';
import { ClockInController } from './infra/http/clock-in/clock-in.controller';
import { TimeClockRepository } from './domain/time-clock.repo';
import { TimeclockRepositoryImpl } from './infra/persistence/time-clock-impl.repo';
import { ClockOutController } from './infra/http/clock-out/clock-out.controller';
import { GetTimeClockRecordsController } from './infra/http/get-time-clock/get-time-clock-records.controller';
import { ClockOutCmdHdlr } from './application/clock-out/clock-out.cmd';
import { SupabaseModule } from '@common/persistence/infra/supabase';
import { ClockInCmdHdlr } from './application/clock-in/clock-in-cmd';

const COMMAND_HANDLERS = [ClockInCmdHdlr, ClockOutCmdHdlr];

@Module({
  imports: [
    SupabaseModule.forFeature({
      repositories: [
        { provide: TimeClockRepository, useClass: TimeclockRepositoryImpl },
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
