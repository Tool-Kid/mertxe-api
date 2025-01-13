import { Module } from '@nestjs/common';
import { ClockInController } from './infra/http/clock-in.controller';
import { TimeClockRepository } from './domain/time-clock.repo';
import { SupabaseTimeclockRepository } from './infra/persistence/supabase-time-clock.repo';
import { ClockOutController } from './infra/http/clock-out.controller';

@Module({
  controllers: [ClockInController, ClockOutController],
  providers: [
    { provide: TimeClockRepository, useClass: SupabaseTimeclockRepository },
  ],
})
export class TimeClockModule {}
