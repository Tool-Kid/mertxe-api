import { Contribution } from '../contribution';
import { ContributionStatus } from '../contribution-status';
import { ContributionType } from '../contribution-type';

export class GenericContribution extends Contribution {
  constructor(readonly type: ContributionType, readonly comments: string) {
    super({
      type,
      comments,
      status: ContributionStatus.PENDING,
    });
  }
}
