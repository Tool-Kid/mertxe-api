import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddContributionCmd } from './add-contribution.cmd';
import { Contribution } from '@modules/contributions/domain/contribution';
import { ContributionsRepository } from '@modules/contributions/domain/contributions.repo';

@CommandHandler(AddContributionCmd)
export class AddContributionCmdHdlr
  implements ICommandHandler<AddContributionCmd, Contribution>
{
  constructor(
    private readonly contributionsRepository: ContributionsRepository
  ) {}

  async execute(command: AddContributionCmd): Promise<Contribution> {
    const contribution = await Contribution.createForType(command.type, {
      comments: command.comments,
    });
    const added = await this.contributionsRepository.addContribution(
      contribution
    );
    return added as Contribution;
  }
}
