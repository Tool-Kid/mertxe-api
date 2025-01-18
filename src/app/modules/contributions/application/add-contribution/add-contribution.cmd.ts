import { ContributionType } from '@modules/contributions/domain/contribution-type';

export class AddContributionCmd {
  constructor(readonly type: ContributionType, readonly comments: string) {}
}
