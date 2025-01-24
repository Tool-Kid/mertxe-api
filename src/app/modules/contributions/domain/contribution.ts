import { ContributionType } from './contribution-type';
import { Aggregate } from '@mertxe/core';
import { ContributionFactory } from './factory';
import { ContributionStatus } from './contribution-status';

export interface ContributionProps {
  id?: number;
  userId?: string;
  points?: number;
  type: ContributionType;
  comments: string;
  status: ContributionStatus;
}

export class Contribution extends Aggregate<ContributionProps> {
  static async createForType(
    type: ContributionType,
    data: any
  ): Promise<Contribution> {
    return await ContributionFactory.build(type, data);
  }

  approve() {
    this.set('status').to(ContributionStatus.ACCEPTED);
  }
}
