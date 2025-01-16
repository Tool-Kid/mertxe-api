import { ContributionType } from './contribution-type';
import { Aggregate } from 'types-ddd';

export interface ContributionProps {
  id: number;
  userId: string;
  points: number;
  type: ContributionType;
}

export class Contribution extends Aggregate<ContributionProps> {}
