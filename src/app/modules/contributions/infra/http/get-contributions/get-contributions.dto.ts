import { ContributionType } from '@modules/contributions/domain/contribution-type';

export class GetContributionsEntryResponse {
  id: number;
  type: ContributionType;
  comments: string;
}

export class GetContributionsResponse {
  entries: GetContributionsEntryResponse[];
}
