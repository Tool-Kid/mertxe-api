import { ContributionType } from './contribution-type';
import { Aggregate } from 'types-ddd';
import { ContributionFactory } from './factory';

export interface ContributionProps {
  id?: number;
  userId?: string;
  points?: number;
  type: ContributionType;
  comments: string;
}

export class Contribution extends Aggregate<ContributionProps> {
  static async createForType(
    type: ContributionType,
    data: any
  ): Promise<Contribution> {
    return await ContributionFactory.build(type, data);
  }
}
