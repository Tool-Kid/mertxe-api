import { Aggregate } from '@common/ddd';
import { ChallengeStatus } from './challenge-status';
import { ChallengeFrequency } from './challenge-frequency';

interface ChallengeProps {
  id: number;
  status: ChallengeStatus;
  startsAt: string;
  endsAt: string;
  frequency: ChallengeFrequency;
}

export class Challenge extends Aggregate<ChallengeProps> {}
