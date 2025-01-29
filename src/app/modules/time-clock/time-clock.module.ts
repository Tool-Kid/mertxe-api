import { Module } from '@nestjs/common';
import { ClockInController } from './infra/http/clock-in/clock-in.controller';
import { TimeClockRepository } from './domain/time-clock.repo';
import { TimeclockRepositoryImpl } from './infra/persistence/time-clock-impl.repo';
import { ClockOutController } from './infra/http/clock-out/clock-out.controller';
import { GetTimeClockRecordsController } from './infra/http/get-time-clock/get-time-clock-records.controller';
import { ClockOutCmdHdlr } from './application/clock-out/clock-out.cmd';
import { NotificationsModule, PersistenceModule } from '@mertxe/core';
import { ClockInCmdHdlr } from './application/clock-in/clock-in-cmd';
import { TimeClockSessionReportNotification } from '@modules/time-clock/domain/notifications';
import { TimeClockSessionReportEmailNotification } from '@modules/time-clock/infra/notifications/time-clock-session-report.notification';

const COMMAND_HANDLERS = [ClockInCmdHdlr, ClockOutCmdHdlr];

@Module({
  imports: [
    PersistenceModule.forFeature({
      repositories: [
        { provide: TimeClockRepository, useClass: TimeclockRepositoryImpl },
      ],
    }),
    NotificationsModule.forFeature({
      notifications: [
        {
          report: TimeClockSessionReportNotification,
          using: [TimeClockSessionReportEmailNotification],
        },
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
