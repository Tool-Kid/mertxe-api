import { Contribution } from '../contribution';
import { ContributionType } from '../contribution-type';

export class GenericContribution extends Contribution {
  constructor(readonly type: ContributionType, readonly comments: string) {
    super({
      type,
      comments,
    });
  }
}
