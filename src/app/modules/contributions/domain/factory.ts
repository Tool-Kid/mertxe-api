import { Contribution } from './contribution';
import { ContributionType } from './contribution-type';

export class ContributionFactory {
  static async build(type: ContributionType, data: any): Promise<Contribution> {
    switch (type) {
      case ContributionType.CASH:
      case ContributionType.GOODS:
      case ContributionType.SERVICE:
        return new (await import('./types/generic')).GenericContribution(
          type,
          data.comments
        );
    }
  }
}
