import { Contribution } from './contribution';

export abstract class ContributionsRepository {
  abstract getContributions(): Promise<Contribution[]>;
  abstract getContributionById(id: number): Promise<Contribution>;
  abstract addContribution(
    contribution: Partial<Contribution>
  ): Promise<Partial<Contribution>>;
  abstract update(contribution: Contribution): Promise<Contribution>;
}
