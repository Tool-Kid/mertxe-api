import { ContributionStatus } from '@modules/contributions/domain/contribution-status';
import { ContributionType } from '@modules/contributions/domain/contribution-type';

export class AddContributionDto {
  type: ContributionType;
  comments: string;
}

export class AddContributionResponse {
  id: number;
  type: ContributionType;
  comments: string;
  points: number;
  status: ContributionStatus;
}
