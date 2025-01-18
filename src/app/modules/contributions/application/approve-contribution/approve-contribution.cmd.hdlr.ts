import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ApproveContributionCmd } from './approve-contribution.cmd';
import { Contribution } from '@modules/contributions/domain/contribution';
import { ContributionsRepository } from '@modules/contributions/domain/contributions.repo';
import { ResourceNotFoundException } from '@common/error';

@CommandHandler(ApproveContributionCmd)
export class ApproveContributionCmdHdlr
  implements ICommandHandler<ApproveContributionCmd, Contribution>
{
  constructor(
    private readonly contributionsRepository: ContributionsRepository
  ) {}

  async execute(command: ApproveContributionCmd): Promise<Contribution> {
    const contribution = await this.contributionsRepository.getContributionById(
      command.id
    );
    if (!contribution) {
      throw new ResourceNotFoundException(Contribution.name, command.id);
    }

    contribution.approve();

    const updated = this.contributionsRepository.update(contribution);
    return updated;
  }
}
