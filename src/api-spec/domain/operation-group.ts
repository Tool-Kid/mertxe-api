import { ApiOperation } from './operation';

export enum ApiGroup {
  AUTH = 'Auth',
  TIME_CLOCK = 'Time clock',
  USER_PROFILE = 'User Profile',
  SCORING = 'Scoring',
  CONTRIBUTIONS = 'Contributions',
  CHALLENGES = 'CHALLENGES',
}

export interface ApiOperationGroup {
  name: ApiGroup;
  operations: ApiOperation[];
}
