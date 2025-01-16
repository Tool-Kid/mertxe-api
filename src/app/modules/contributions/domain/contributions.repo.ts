import { Contribution } from './contribution';

export abstract class ContributionsRepository {
  abstract getContributions(): Promise<Contribution[]>;
  abstract addContribution(
    contribution: Partial<Contribution>
  ): Promise<Partial<Contribution>>;
}
