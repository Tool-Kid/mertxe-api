import { TimeClockRecord } from '@modules/time-clock/domain/time-clock-record';
import { TimeClockRepository } from '@modules/time-clock/domain/time-clock.repo';
import { TimeClockSessionFinished } from '@modules/time-clock/domain/time-clock-session-finished.event';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventBus } from '@mertxe/core';

export class ClockOutCmd {}

@CommandHandler(ClockOutCmd)
export class ClockOutCmdHdlr
  implements ICommandHandler<ClockOutCmd, TimeClockRecord>
{
  constructor(
    private readonly timeClockRepository: TimeClockRepository,
    private readonly eventBus: EventBus
  ) {}

  async execute(command: ClockOutCmd): Promise<TimeClockRecord> {
    const result = await this.timeClockRepository.clockOut();

    await this.eventBus.publish(
      new TimeClockSessionFinished({
        clockInAt: result.getRaw().clockInAt,
        clockOutAt: result.getRaw().clockOutAt,
      })
    );
    return result;
  }
}
