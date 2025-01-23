import { TimeClockRecord } from '@modules/time-clock/domain/time-clock-record';
import { TimeClockRepository } from '@modules/time-clock/domain/time-clock.repo';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

export class ClockInCmd {}

@CommandHandler(ClockInCmd)
export class ClockInCmdHdlr
  implements ICommandHandler<ClockInCmd, TimeClockRecord>
{
  constructor(private readonly timeClockRepository: TimeClockRepository) {}

  async execute(command: ClockInCmd): Promise<TimeClockRecord> {
    const result = await this.timeClockRepository.clockIn();
    return result;
  }
}
