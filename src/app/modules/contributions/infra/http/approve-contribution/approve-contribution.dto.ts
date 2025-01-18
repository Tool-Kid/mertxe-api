import { ContributionStatus } from '@modules/contributions/domain/contribution-status';
import { ContributionType } from '@modules/contributions/domain/contribution-type';

export class ApproveContributionDto {
  points: number;
}

export class ApproveContributionResponse {
  id: number;
  type: ContributionType;
  points: number;
  status: ContributionStatus;
  comments: string;
}
