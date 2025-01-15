import { TimeClockRecord } from '../../domain/time-clock-record';
import { TimeClockRepository } from '../../domain/time-clock.repo';
import { TimeClockSessionFinished } from '../../domain/time-clock-session-finished.event';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

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
      new TimeClockSessionFinished(result.clockInAt, result.clockOutAt)
    );
    return result;
  }
}
